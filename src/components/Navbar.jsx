import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heal from "../assets/heal.jpg";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { checkToken, getIdUser, logoutUser } from "../store/action/UserAction";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tokenLocal = checkToken(); // Cek token dari localStorage
  const id = tokenLocal ? getIdUser(tokenLocal) : null; // Ambil ID user jika token ada

  // Fungsi untuk mengambil data user berdasarkan ID
  const fetchUser = async () => {
    try {
      if (id) {
        const res = await axios.get(`https://fakestoreapi.com/users/${id}`);
        setName(res.data.username); // Simpan nama user
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
    }
  };

  useEffect(() => {
    if (tokenLocal) {
      fetchUser(); // Ambil data user saat token tersedia
    }
  }, [tokenLocal]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={Heal} alt="Logo" className="h-16 w-auto object-contain" />
        </Link>
      </div>

      {/* Navigasi Tengah (hidden on mobile and shows on larger screens) */}
      <div className="hidden md:flex-grow flex justify-center items-center gap-x-8 ml-8">
        <ul className="flex space-x-6 text-blue-600 text-sm font-semibold">
          <li>
            <Link to="/" className="cursor-pointer hover:text-blue-800">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="cursor-pointer hover:text-blue-800">
              About
            </Link>
          </li>
          <li>
            <Link to="/services" className="cursor-pointer hover:text-blue-800">
              Services
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex gap-6 items-center">
        {/* Icon Cart */}
        <Link
          to="/cart"
          className="relative text-gray-600 text-sm flex items-center hover:underline"
        >
          <FiShoppingCart size={20} />
          <span className="ml-2">Cart</span>
        </Link>

        {tokenLocal ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-blue-600 text-sm font-semibold"
            >
              Hello, {name || "User"}
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
                <ul className="text-sm">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <button
                      onClick={() => dispatch(logoutUser())}
                      className="w-full text-left text-red-600"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 text-sm hover:underline">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
