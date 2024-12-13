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
  const [showCheckoutError, setShowCheckoutError] = useState(false);
  const [showCheckoutSucccess, setShowCheckoutSucccess] = useState(false);
  const [productToRemove, setProductToRemove] = useState(null);

  useEffect(() => {
    const fetchProductsDetails = async () => {
      if (carts?.[0]?.products?.length) {
        try {
          const products = carts[0].products;
          console.log("Carts data: ", carts);
          let arr = [];

          await Promise.all(
            products.map(async (item) => {
              const response = await dispatch(fetchProducts(item.productId));
              arr.push(response);
            })
          );
          setProductsDetails(arr);

          let initialQuantities = {};
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
      let newQuantity =
        type === "increase"
          ? prevQuantities[productId] + 1
          : prevQuantities[productId] - 1;

      if (newQuantity < 1) {
        setProductToRemove(productId);
        setShowConfirmModal(true);
        newQuantity = 1;
      }

      const updatedQuantities = {
        ...prevQuantities,
        [productId]: Math.max(newQuantity, 1),
      };

      setSelectedProducts((prevSelected) => {
        if (prevSelected[productId]) {
          return {
            ...prevSelected,
            [productId]: { quantity: updatedQuantities[productId] },
          };
        }
        return prevSelected;
      });

      return updatedQuantities;
    });
  };

  const handleConfirmRemove = () => {
    const updatedCartProducts = carts[0].products.filter(
      (item) => item.productId !== productToRemove
    );

    const updatedCart = { ...carts[0], products: updatedCartProducts };
    dispatch(updateCart(updatedCart));
    setShowConfirmModal(false);
    window.location.reload();
  };

  const handleCancelRemove = () => {
    setShowConfirmModal(false);
  };

  const handleCheckboxChange = (productId) => {
    setSelectedProducts((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (newSelected[productId]) {
        delete newSelected[productId];
      } else {
        newSelected[productId] = {
          quantity: quantities[productId] || 1,
        };
      }

      return newSelected;
    });
  };
  const calculateTotal = () => {
    let total = 0;
    productsDetails.forEach((product) => {
      if (selectedProducts[product.id]) {
        const quantity = quantities[product.id] || 1;
        total += product.price * quantity;
      }
    });
    return total;
  };

  const handleCheckOut = () => {
    let hasError = false;

    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      if (hasError) return;

      const product = productsDetails.find((p) => p.id === parseInt(productId));
      const quantity = productDetails.quantity;

      if (quantity > product.quantity) {
        hasError = true;
        setShowCheckoutError(true);
        return;
      }
    });

    if (hasError) {
      return;
    }

    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      const quantity = productDetails.quantity;

      dispatch(
        updateProductQuantity({ productId: parseInt(productId), quantity })
      );

      const updatedCartProducts = carts[0].products.filter(
        (item) => !selectedProducts[item.productId]
      );

      const updatedCart = { ...carts[0], products: updatedCartProducts };
      dispatch(updateCart(updatedCart));
    });

    setShowCheckoutSucccess(true);
  };

  const handleCloseSuccess = () => {
    setShowCheckoutSucccess(false);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-200">
        <h1 className="text-2xl text-gray-700">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-red-100">
        <h1 className="text-2xl text-red-600">Error loading cart</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center space-x-2 mb-6 px-6 py-4 bg-white shadow-md rounded-lg">
        <Link to="/" className="text-blue-500 hover:text-blue-700">
          <FaArrowLeft />
        </Link>
        <h1 className="text-2xl font-semibold text-gray-700">My Cart</h1>
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg p-6 mx-6 mb-6">
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
                  <td className="py-2 px-4 flex items-center">
                    <input
                      type="checkbox"
                      checked={!!selectedProducts[product.id]}
                      onChange={() => handleCheckboxChange(product.id)}
                      className="mr-2"
                    />
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-16 h-16 object-cover rounded-md mr-4"
                    />
                    <span className="text-gray-700">{product.title}</span>
                  </td>
                  <td className="py-2 px-4 text-gray-600">${product.price}</td>
                  <td className="py-2 px-4 flex items-center space-x-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, "decrease")
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                    >
                      <FaMinus />
                    </button>
                    <span className="text-gray-700">{quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, "increase")
                      }
                      className="bg-gray-200 hover:bg-gray-300 p-2 rounded-md"
                    >
                      <FaPlus />
                    </button>
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    ${product.price * quantity}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="mt-6 flex justify-between items-center">
          <div className="font-semibold text-xl text-gray-800">
            Total: ${calculateTotal()}
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-md"
            onClick={handleCheckOut}
          >
            Checkout
          </button>
        </div>
      </div>

      {/* Checkout error modal */}
      {showCheckoutError && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-red-600">
              Quantity not met sorry
            </h2>
            <button
              className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
              onClick={() => setShowCheckoutError(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Checkout success modal */}
      {showCheckoutSucccess && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-green-600">
              Checkout successful!
            </h2>
            <button
              className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
              onClick={handleCloseSuccess}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Remove product confirmation modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700">
              Are you sure you want to remove this product from the cart?
            </h2>
            <div className="mt-4 flex space-x-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
                onClick={handleCancelRemove}
              >
                Cancel
              </button>
              <button
                className="bg-orange-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={handleConfirmRemove}
              >
                Remove Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
