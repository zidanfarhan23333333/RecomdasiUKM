import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProducts } from "../store/action/ProductAction";
import StarRating from "../components/Rating";
import { checkToken, getIdUser } from "../store/action/UserAction";
import { addToCart } from "../store/action/CartAction";
import { FiArrowLeft, FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = checkToken();
  const [quantity, setQuantity] = useState(1);

  const { singleProduct, loading, singleProductNotFound } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts(id));
  }, [dispatch, id]);

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = (productId) => {
    if (!token) {
      navigate("/login");
    } else {
      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      const userId = getIdUser(token);
      const productDataToCart = { productId, quantity };

      dispatch(addToCart(userId, formattedDate, [productDataToCart]));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-4xl text-gray-600">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      {/* Update the back button to navigate to home */}
      <motion.Link
        to="/"
        className="text-blue-500 text-lg flex items-center mb-6 "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FiArrowLeft className="mr-2" size={20} /> {/* Home icon */}
        Back to Home
      </motion.Link>

      {singleProductNotFound ? (
        <motion.div
          className="flex flex-col items-center justify-center h-full text-center"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-2xl text-gray-600">Product Not Found</p>
        </motion.div>
      ) : (
        <motion.div
          className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row"
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:w-1/2 w-full bg-white p-6 flex items-center justify-center">
            <motion.img
              src={singleProduct.image}
              alt={singleProduct.title}
              className="object-contain h-96"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>

          <div className="md:w-1/2 w-full p-8 flex flex-col gap-6">
            <h1 className="text-3xl font-bold text-gray-800">
              {singleProduct.title}
            </h1>

            <div className="flex items-center gap-2">
              <StarRating rating={singleProduct.rating?.rate} />
              <span className="text-gray-600">
                ({singleProduct.rating?.count} reviews)
              </span>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">
                Product Description
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {singleProduct.description}
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              ${singleProduct.price}
            </h2>

            <div className="flex items-center gap-4">
              <span className="font-medium text-lg">Stock:</span>
              <span className="text-gray-800 text-lg">
                {singleProduct.quantity}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleMinus}
                disabled={quantity === 1}
                className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 disabled:opacity-50"
              >
                <FiMinus />
              </button>
              <span className="text-xl font-medium">{quantity}</span>
              <button
                onClick={handlePlus}
                className="p-2 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300"
              >
                <FiPlus />
              </button>
            </div>

            {/* Add to Cart Button */}
            <motion.button
              onClick={() => handleAddToCart(singleProduct.id)}
              className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FiShoppingCart size={20} /> Add to Cart
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ProductDetail;
