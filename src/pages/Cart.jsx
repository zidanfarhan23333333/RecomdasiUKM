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

  const handleQuantityChange = (productId, type) => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      const newQuantity =
        type === "increase" ? currentQuantity + 1 : currentQuantity - 1;
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
    const updatedCartProducts = carts[0].products.filter(
      (item) => !selectedProducts[item.productId]
    );

    Object.entries(selectedProducts).forEach(([productId, productDetails]) => {
      dispatch(
        updateProductQuantity({
          productId: parseInt(productId),
          quantity: productDetails.quantity,
        })
      );
    });

    const updatedCart = { ...carts[0], products: updatedCartProducts };
    dispatch(updateCart(updatedCart));

    setTimeout(() => {
      navigate("/");
    }, 1000);
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
                        handleQuantityChange(product.id, "decrease")
                      }
                    >
                      -
                    </button>
                    <span className="mx-2">{quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(product.id, "increase")
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

      {/* Mobile view */}
      <div className="flex flex-col gap-4 md:hidden">
        {productsDetails.map((product) => {
          const quantity = quantities[product.id] || 1;
          return (
            <div key={product.id} className="flex flex-col bg-main-color p-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={!!selectedProducts[product.id]}
                  onChange={() => handleCheckboxChange(product.id)}
                />
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-20 w-20 object-contain"
                />
                <div>
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                </div>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleQuantityChange(product.id, "decrease")}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.id, "increase")}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Checkout */}
      <div className="flex justify-between items-center p-4">
        <span className="text-lg font-semibold">
          Total: ${calculateTotal()}
        </span>
        <button
          className="bg-blue-800 text-white p-3 rounded-md"
          onClick={handleCheckOut}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
