import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import Doc1 from "../assets/doc1.jpeg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import StarRating from "../components/Rating";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="bg-gray-100 h-screen flex justify-center items-center">
        <p className="text-2xl font-bold">Loading....</p>
      </div>
    );
  }

  if (error) {
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <p className="text-red-500 font-semibold">Error: {error}</p>
    </div>;
  }

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <main className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="text-gray-500 mb-6 flex items-center text-lg font-medium"
        >
          &lt; Back to Products
        </Link>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-shrink-0">
            <div className="w-[400px] h-[400px] overflow-hidden rounded-lg shadow-md">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h2>

            <p className="text-gray-500 text-lg font-medium mb-6">
              Product description
            </p>

            <p className="text-gray-800 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex items-center mb-8">
              <StarRating rating={product.rating?.rate || 0} />
              <span className="text-gray-600 text-lg ml-3">
                ({product.rating?.count} reviews)
              </span>
            </div>

            <div>
              <div className="text-3xl font-semibold text-gray-900 mb-6">
                ${product.price}
              </div>
              <button className="w-full bg-blue-600 text-white py-4 text-lg rounded-lg hover:bg-blue-700 transition duration-200">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default ProductDetail;
