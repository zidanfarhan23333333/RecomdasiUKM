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
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state
  const tokenLocal = checkToken();
  const id = tokenLocal ? getIdUser(tokenLocal) : null;

  const fetchUser = async () => {
    try {
      if (id) {
        const res = await axios.get(`https://fakestoreapi.com/users/${id}`);
        setName(res.data.username);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error.message);
    }
  };

  useEffect(() => {
    if (tokenLocal) {
      fetchUser();
    }
  }, [tokenLocal]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    setShowLogoutModal(true); // Show modal when logout is clicked
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    dispatch(logoutUser()); // Dispatch logout action
  };

  const cancelLogout = () => {
    setShowLogoutModal(false); // Close the modal without logging out
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={Heal} alt="Logo" className="h-16 w-auto object-contain" />
        </Link>
      </div>

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
                      onClick={handleLogout} // Show logout modal
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

      {/* Modal for Logout Confirmation */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-center">Are you sure?</h3>
            <div className="flex justify-between mt-4">
              <button
                onClick={confirmLogout}
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
