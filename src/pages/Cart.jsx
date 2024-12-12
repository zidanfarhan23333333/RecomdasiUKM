import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkToken } from "../store/action/UserAction";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import {
  fetchProducts,
  updateProductQuantity,
} from "../store/action/ProductAction";
import { updateCart } from "../store/action/CartAction";

const Cart = () => {
  const { carts, loading, error } = useSelector((state) => state.carts);
  const dispatch = useDispatch();
  const token = checkToken();
  const navigate = useNavigate();

  const [productsDetails, setProductsDetails] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [selectedProducts, setSelectedProducts] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      if (carts?.[0]?.products?.length) {
        try {
          const products = carts[0].products;
          const arr = await Promise.all(
            products.map(async (item) => {
              const response = await dispatch(fetchProducts(item.productId));
              return response;
            })
          );
          setProductsDetails(arr);

          const initialQuantities = {};
          carts[0].products.forEach((item) => {
            initialQuantities[item.productId] = item.quantity;
          });
          setQuantities(initialQuantities);
        } catch (err) {
          console.error("Error fetching product details:", err);
        }
      }
    };

    fetchProductsDetails();
  }, [carts, dispatch]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  const handleQuantityChange = (productId, type) => {
    setQuantities((prevQuantities) => {
      const newQuantity =
        type === "increase"
          ? prevQuantities[productId] + 1
          : prevQuantities[productId] - 1;

      if (newQuantity < 1) {
        setProductToRemove(productId);
        setShowConfirmModal(true);
        return prevQuantities;
      }

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  const handleConfirmRemove = () => {
    const updatedCartProducts = carts[0].products.filter(
      (item) => item.productId !== productToRemove
    );

    const updatedCart = { ...carts[0], products: updatedCartProducts };
    dispatch(updateCart(updatedCart));
    setShowConfirmModal(false);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      if (updatedSelected[productId]) {
        delete updatedSelected[productId];
      } else {
        updatedSelected[productId] = { quantity: quantities[productId] || 1 };
      }
      return updatedSelected;
    });
  };

  const calculateTotal = () => {
    return productsDetails.reduce((total, product) => {
      if (selectedProducts[product.id]) {
        return total + product.price * quantities[product.id];
      }
      return total;
    }, 0);
  };

  const handleCheckOut = () => {
    const isStockValid = Object.entries(selectedProducts).every(
      ([productId, productDetails]) => {
        const product = productsDetails.find(
          (item) => item.id === parseInt(productId)
        );
        return product && productDetails.quantity <= product.quantity;
      }
    );

    if (!isStockValid) {
      alert("Some products exceed available stock!");
      return;
    }

    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      dispatch(
        updateProductQuantity({
          productId: parseInt(productId),
          quantity: productDetails.quantity,
        })
      );
    });

    setShowCheckoutSuccess(true); // Show checkout success message
  };

  const handleCloseSuccess = () => {
    setShowCheckoutSuccess(false);
    setTimeout(() => {
      navigate("/"); // Redirect to home page after success
    }, 500);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10">Error loading cart</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-6">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold">My Cart</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="py-2 px-4">Products</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Quantity</th>
              <th className="py-2 px-4">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsDetails.map((product) => {
              const quantity = quantities[product.id] || 0;
              return (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      checked={!!selectedProducts[product.id]}
                      onChange={() => handleCheckboxChange(product.id)}
                      className="mr-2"
                    />
                    <img
                      src={product.image} // Assuming `image` is the field holding the image URL
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded-md mr-4"
                    />
                    {product.title}
                  </td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4 flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, "decrease")
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                    >
                      <FaMinus />
                    </button>
                    {quantity}
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, "increase")
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="py-2 px-4">${product.price * quantity}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-4 flex justify-between items-center">
          <div className="font-semibold text-xl">
            Total: ${calculateTotal()}
          </div>
          <button
            onClick={handleCheckOut}
            className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          >
            Checkout
          </button>
        </div>
      </div>

      {showCheckoutSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-semibold">Checkout Successful!</h2>
            <button
              onClick={handleCloseSuccess}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h2 className="text-xl font-semibold">Are you sure?</h2>
            <p className="my-4">
              You are about to remove this product from your cart.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={handleConfirmRemove}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
