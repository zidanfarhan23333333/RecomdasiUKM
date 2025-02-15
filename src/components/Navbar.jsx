import React from "react";
import { Link } from "react-router-dom";
import UKM from "../assets/ukm.png";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent py-4 px-10 shadow-lg z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <img src={UKM} alt="UKM Logo" className="h-12" />

        {/* Menu */}
        <ul className="flex space-x-8 text-black font-medium">
          <li>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/layanan"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Layanan
            </Link>
          </li>

          <li>
            <Link
              to="/riwayatpesan"
              className="hover:text-yellow-300 transition duration-300 ease-in-out"
            >
              Riwayat
            </Link>
          </li>
        </ul>

        {/* Tombol Daftar */}
        <Link
          to="/register"
          className="bg-yellow-400 text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition duration-300 ease-in-out"
        >
          Daftar
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
