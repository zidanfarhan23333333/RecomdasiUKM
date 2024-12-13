import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../store/action/ProductAction";
import axios from "axios";
import StarRating from "../components/Rating";
import { Link, useNavigate } from "react-router-dom";
import { checkToken, getIdUser } from "../store/action/UserAction";
import { addToCart } from "../store/action/CartAction";
import { motion } from "framer-motion";

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    products: originalProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [categories, setCategories] = useState([]);
  const [addedToCartMessage, setAddedToCartMessage] = useState("");
  const token = checkToken();

  const products = originalProducts.map((product) => ({
    ...product,
    quantity: product.quantity || 20,
  }));

  useEffect(() => {
    dispatch(fetchProducts());
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://fakestoreapi.com/products/categories"
        );
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err.message);
      }
    };
    fetchCategories();
  }, [dispatch]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all categories") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  };

  const handleAddToCart = (productId, quantity) => {
    if (!token) {
      alert("Please login to add products to your cart");
      navigate("/login");
    } else {
      const userId = getIdUser(token);
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      const productDataToCart = { productId, quantity };
      dispatch(addToCart(userId, formattedDate, [productDataToCart]));

      setAddedToCartMessage("Product successfully added to your cart!");

      setTimeout(() => {
        setAddedToCartMessage("");
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl text-gray-600">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl text-red-600">Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <select
          onChange={handleCategoryChange}
          className="mb-4 p-3 border border-gray-300 rounded w-full sm:w-1/3 bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="all categories">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {addedToCartMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-6 text-center font-medium shadow-md">
          {addedToCartMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-transform transform hover:scale-105 flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="h-48 w-full bg-white flex items-center justify-center">
              <img
                className="object-contain h-full p-4"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-semibold text-lg mb-2 text-gray-800 truncate">
                {product.title}
              </h2>

              <p className="text-xl font-bold text-orange-600 mb-2">
                ${product.price}
              </p>

              <p className="text-sm text-gray-500 mb-4">
                Quantity:{" "}
                <span className="font-medium">{product.quantity}</span>
              </p>

              <StarRating rating={product.rating?.rate || 0} />

              <div className="flex justify-between mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="border border-orange-500 text-orange-500 py-2 px-4 rounded-lg hover:bg-orange-500 hover:text-white transition-colors text-center text-sm font-medium w-full mr-2"
                >
                  Detail
                </Link>
                <button
                  onClick={() => handleAddToCart(product.id, 1)}
                  className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-medium w-full"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
