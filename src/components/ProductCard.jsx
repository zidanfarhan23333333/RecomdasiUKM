import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  fetchProductsByCategory,
} from "../store/action/ProductAction";
import axios from "axios";
import StarRating from "../components/Rating"; // Import the StarRating component

const ProductCard = () => {
  const dispatch = useDispatch();
  const {
    products: originalProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Fetch products and categories
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

  // Add default quantity to products
  useEffect(() => {
    if (originalProducts.length > 0) {
      const productsWithQuantity = originalProducts.map((product) => ({
        ...product,
        quantity: 20,
      }));
      setProducts(productsWithQuantity);
    }
  }, [originalProducts]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory === "all categories") {
      dispatch(fetchProducts());
    } else {
      dispatch(fetchProductsByCategory(selectedCategory));
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <p className="text-2xl font-bold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <p className="text-red-500 font-semibold">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100 p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Show Product List</h1>
        <select
          onChange={handleCategoryChange}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all categories">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              className="h-48 w-full object-cover"
              src={product.image}
              alt={product.title}
            />
            <div className="p-4">
              <h2 className="font-bold text-lg mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-gray-700 text-base mb-4 font-semibold">
                ${product.price}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                Quantity: {product.quantity}
              </p>
              {/* Add the StarRating Component */}
              <StarRating rating={product.rating?.rate || 0} />{" "}
              {/* Ensure a default rating if none exists */}
              {/* Button Section */}
              <div className="flex justify-between space-x-2 mt-4">
                <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 w-1/2">
                  Detail
                </button>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-1/2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
