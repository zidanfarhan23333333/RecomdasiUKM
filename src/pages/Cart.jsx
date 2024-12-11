import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkToken } from "../store/action/UserAction";
import {
  fetchProducts,
  updateProductQuantity,
} from "../store/action/ProductAction";
import { updateCart } from "../store/action/CartAction";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const Cart = () => {
  const { carts, loading, error } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const [productsDetails, setProductsDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [quantityError, setQuantityError] = useState(""); // State for error message
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    if (!token) navigate("/login");
  }, [navigate, token]);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      if (carts?.[0]?.products?.length) {
        try {
          const products = carts[0].products;
          const fetchedProducts = await Promise.all(
            products.map((item) => dispatch(fetchProducts(item.productId)))
          );

          setProductsDetails(fetchedProducts);

          const initialQuantities = products.reduce((acc, item) => {
            acc[item.productId] = item.quantity;
            return acc;
          }, {});
          setQuantities(initialQuantities);

          const initialSelection = products.reduce((acc, item) => {
            acc[item.productId] = { quantity: item.quantity };
            return acc;
          }, {});
          setSelectedProducts(initialSelection);
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };

    fetchProductsDetails();
  }, [carts, dispatch]);

  const handleQuantityChange = (productId, type, stock) => {
    setQuantityError(""); // Reset error message

    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      let newQuantity =
        type === "increase" ? currentQuantity + 1 : currentQuantity - 1;

      // Ensure quantity does not exceed stock
      if (newQuantity > stock) {
        setQuantityError("Sorry, the quantity exceeds the available stock.");
        return prevQuantities;
      }

      return {
        ...prevQuantities,
        [productId]: Math.max(newQuantity, 1),
      };
    });
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };
      if (newSelected[productId]) {
        delete newSelected[productId];
      } else {
        newSelected[productId] = { quantity: quantities[productId] || 1 };
      }
      return newSelected;
    });
  };

  const calculateTotal = () =>
    productsDetails.reduce((total, product) => {
      if (selectedProducts[product.id]) {
        const quantity = quantities[product.id] || 1;
        total += product.price * quantity;
      }
      return total;
    }, 0);

  const handleCheckOut = () => {
    // Check if any selected product's quantity exceeds its stock
    const invalidProduct = Object.entries(selectedProducts).find(
      ([productId, productDetails]) => {
        const product = productsDetails.find(
          (product) => product.id === parseInt(productId)
        );
        return product && productDetails.quantity > product.stock;
      }
    );

    if (invalidProduct) {
      const productName = productsDetails.find(
        (product) => product.id === parseInt(invalidProduct[0])
      ).title;

      // Display an alert if quantity exceeds available stock
      window.alert(
        `Maaf, kuantitas produk "${productName}" melebihi stok yang tersedia.`
      );

      return; // Stop checkout process
    }

    // Proceed with checkout if no quantity issues
    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      const updatedQuantity = productDetails.quantity;
      dispatch(
        updateProductQuantity({
          productId: parseInt(productId),
          quantity: updatedQuantity,
        })
      );
    });

    const updatedCartProducts = carts[0].products.filter(
      (item) => selectedProducts[item.productId]
    );

    // Update the cart with selected products and their updated quantities
    const updatedCart = { ...carts[0], products: updatedCartProducts };
    dispatch(updateCart(updatedCart));

    setTimeout(() => {
      navigate("/"); // Redirect to home after checkout
    }, 1000);
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when clicked
  };

  if (loading) {
    return (
      <div className="bg-second-color h-screen flex justify-center items-center">
        <h1 className="text-4xl text-third-color">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-second-color h-screen flex justify-center items-center">
        <h1 className="text-4xl text-red-600">Error loading cart</h1>
      </div>
    );
  }

  if (!productsDetails.length) {
    return (
      <div className="bg-second-color h-screen flex justify-center items-center">
        <h1 className="text-4xl text-third-color">No items in your cart</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-second-color pt-20 gap-6">
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-4">
          <FiArrowLeft className="ml-3" /> Back
        </Link>
        <h1 className="text-3xl font-semibold">My Cart</h1>
      </div>

      {/* Desktop view */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b">
              <th className="text-center p-4">Products</th>
              <th className="text-center p-4">Price</th>
              <th className="text-center p-4">Quantity</th>
              <th className="text-center p-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsDetails.map((product) => {
              const quantity = quantities[product.id] || 1;
              return (
                <tr key={product.id} className="border-b">
                  <td className="p-4 flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={!!selectedProducts[product.id]}
                      onChange={() => handleCheckboxChange(product.id)}
                    />
                    <Link to={`/product/${product.id}`} className="flex gap-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-20 w-20 object-contain"
                      />
                      <span>{product.title}</span>
                    </Link>
                  </td>
                  <td className="text-center p-4">${product.price}</td>
                  <td className="text-center p-4">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          "decrease",
                          product.stock
                        )
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          product.id,
                          "increase",
                          product.stock
                        )
                      }
                    >
                      +
                    </button>
                  </td>
                  <td className="text-center p-4">
                    ${product.price * quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal for quantity error */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-semibold text-red-600">Error</h2>
            <p className="mt-4 text-red-600">{quantityError}</p>
            <button
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between px-6">
        <h3 className="text-xl font-semibold">Total: ${calculateTotal()}</h3>
        <button
          className="bg-main-color py-2 px-4 rounded text-blue-600"
          onClick={handleCheckOut}
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default Cart;
