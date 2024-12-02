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

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products: originalProducts,
    loading,
    error,
  } = useSelector((state) => state.products);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const token = checkToken();

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

  const handleAddToCart = (productId, quantity) => {
    if (!token) {
      navigate("/login");
    } else {
      const userId = getIdUser(token);
      const productDataToCart = {
        productId,
        quantity,
      };
      dispatch(addToCart(userId, productDataToCart));
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
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-r from-gray-100 to-blue-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Explore Products
        </h1>
        <select
          onChange={handleCategoryChange}
          className="bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <option value="all categories">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col justify-between bg-white shadow-lg rounded-lg overflow-hidden h-full"
          >
            <div className="h-48 w-full bg-white flex items-center justify-center">
              <img
                className="object-contain h-full p-4"
                src={product.image}
                alt={product.title}
              />
            </div>

            <div className="p-4 flex flex-col flex-1">
              {/* Nama Produk */}
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

              <StarRating rating={product.rating?.rate || 0} />

              <div className="flex justify-between space-x-2 mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="border border-orange-500 text-black py-2 px-4 rounded-lg hover:bg-orange-600 w-1/2 text-center"
                >
                  Detail
                </Link>
                <button
                  onClick={() => handleAddToCart(product.id, 1)}
                  className="bg-blue-800 text-white py-2 px-4 rounded-lg hover:bg-blue-700 w-1/2 text-center"
                >
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
