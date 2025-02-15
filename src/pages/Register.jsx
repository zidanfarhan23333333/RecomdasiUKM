import React from "react";
import { useNavigate } from "react-router-dom";
import { FaApple, FaGoogle, FaFacebook, FaEye } from "react-icons/fa";
import Banner from "../assets/2.jpg";
import UKM from "../assets/ukm.png";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-500 relative ">
      <img
        src={Banner}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-80 backdrop-blur-lg"
      />

      <div className="bg-white bg-opacity-90 rounded-3xl shadow-lg overflow-hidden flex max-w-7xl p-6 w-full relative">
        {/* Left Section - Form */}
        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h1 className="text-3xl font-semibold text-gray-800 mb-4">
            UKM <span className="font-bold text-blue-600">Olahraga UNIMMA</span>
          </h1>
          <div className="flex justify-center space-x-4 mb-4">
            <button className="p-2 rounded-full border border-gray-300">
              <FaApple className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-300">
              <FaGoogle className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full border border-gray-300">
              <FaFacebook className="h-5 w-5" />
            </button>
          </div>
          <p className="text-gray-500 text-center mb-4">or</p>
          <input
            type="text"
            placeholder="Full name"
            className="w-full p-3 border rounded-lg mb-3"
          />
          <input
            type="text"
            placeholder="Asal sekolah"
            className="w-full p-3 border rounded-lg mb-3"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg mb-3"
          />
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg"
            />
            <span className="absolute right-4 top-3 cursor-pointer">
              <FaEye />
            </span>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full mt-4 p-3 bg-blue-700 text-white rounded-lg font-semibold"
          >
            Start
          </button>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span className="text-black font-semibold cursor-pointer">
              Log in
            </span>
          </p>
        </div>

        {/* Right Section - Image */}
        <div className="w-1/2 relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-xl">
          <motion.img
            src={UKM}
            alt="Nature"
            className="w-full h-full object-cover"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }} // ✅ Efek floating hanya pada logo
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="absolute top-10 left-10 bg-gray-900 bg-opacity-50 text-white p-2 rounded-lg">
            <p className="text-sm">UKM Olahraga</p>
            <p className="text-xs">Universitas Muhammadiyah Magelang</p>
          </div>
          <div className="absolute bottom-10 left-10 bg-gray-900 bg-opacity-50 text-white p-2 rounded-lg">
            <p className="text-xs">5 km dari Kota Magelang</p>
          </div>
          <div className="absolute bottom-5 right-10 bg-gray-900 bg-opacity-50 text-white p-2 rounded-lg">
            <p className="text-xs">Mertoyudan Jawa tengah</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
