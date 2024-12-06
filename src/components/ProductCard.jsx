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
  const [addedToCartMessage, setAddedToCartMessage] = useState(""); // State for success message
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

      // Set the success message
      setAddedToCartMessage("Product successfully added to your cart!");

      // Optionally, hide the message after a few seconds
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
    <div className="p-4">
      {/* Category Selection */}
      <select
        onChange={handleCategoryChange}
        className="mb-4 p-2 border border-gray-300 rounded"
      >
        <option value="all categories">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* Display Success Message */}
      {addedToCartMessage && (
        <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
          {addedToCartMessage}
        </div>
      )}

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden h-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            {/* Product Image */}
            <div className="h-48 w-full bg-white flex items-center justify-center">
              <img
                className="object-contain h-full p-4"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-bold text-lg mb-2 line-clamp-2">
                {product.title}
              </h2>

              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                {product.description || "No description available."}
              </p>

              <p className="text-gray-700 text-base mb-4 font-semibold">
                ${product.price}
              </p>

              <p className="text-gray-600 text-sm mb-4">
                Quantity: {product.quantity}
              </p>

              {/* Product Rating */}
              <StarRating rating={product.rating?.rate || 0} />

              {/* Action Buttons */}
              <div className="flex justify-between space-x-2 mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="border border-orange-500 text-black py-2 px-4 rounded-lg hover:bg-blue-600 w-1/2 text-center"
                >
                  Detail
                </Link>
                <button
                  onClick={() => handleAddToCart(product.id, 1)} // Default to 1 quantity
                  className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-1/2 text-center"
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
