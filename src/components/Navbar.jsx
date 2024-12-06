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

      {/* Bagian Kanan */}
      <div className="flex gap-6 items-center">
        {/* Icon Cart */}
        <Link
          to="/cart"
          className="relative text-gray-600 text-sm flex items-center hover:underline"
        >
          <FiShoppingCart size={20} />
          <span className="ml-2">Cart</span>
        </Link>

        {/* Jika Login */}
        {tokenLocal ? (
          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-sm font-semibold">
              Hello, {name || "User"}
            </span>
            <button
              onClick={() => dispatch(logoutUser())}
              className="text-red-600 text-sm hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="text-blue-600 text-sm hover:underline">
            Login
          </Link>
        )}
      </div>

      {/* Mobile Navigation (Hamburger Menu) */}
      <div className="md:hidden flex items-center">
        <button
          type="button"
          className="text-blue-600"
          // Toggle mobile menu (hamburger)
          onClick={() => {
            const menu = document.getElementById("mobile-menu");
            menu.classList.toggle("hidden");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
