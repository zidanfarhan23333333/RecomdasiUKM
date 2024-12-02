import { Link } from "react-router-dom";
import Heal from "../assets/heal.jpg";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { checkToken, getIdUser, logoutUser } from "../store/action/UserAction";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({
    user: state.userState?.user,
    token: state.userState?.token,
  }));
  const [name, setName] = useState("");

  const tokenLocal = checkToken(); // Assuming checkToken fetches the token from localStorage or elsewhere
  const id = tokenLocal ? getIdUser(tokenLocal) : null; // Get user ID from the token

  const fetchUser = async () => {
    if (id) {
      const res = await axios.get(`https://fakestoreapi.com/users/${id}`);
      console.log("user", res);
      setName(res.data.username);
    }
  };

  useEffect(() => {
    if (tokenLocal) {
      fetchUser(); // Fetch user data if a valid token exists
    }
  }, [tokenLocal]); // Only fetch user when the tokenLocal is available

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/">
          <img src={Heal} alt="Logo" className="h-16 w-auto object-contain" />
        </Link>
      </div>

      <div className="flex-grow flex justify-center items-center gap-x-8 ml-8">
        <ul className="flex space-x-6 text-blue-600 text-sm font-semibold">
          <li className="cursor-pointer hover:text-blue-800">Home</li>
          <li className="cursor-pointer hover:text-blue-800">About</li>
          <li className="cursor-pointer hover:text-blue-800">Services</li>
        </ul>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/cart" className="text-gray-600 text-sm hover:underline">
          <FiShoppingCart size={20} /> Cart
        </Link>

        {tokenLocal ? (
          <div className="flex items-center gap-4">
            <span className="text-blue-600 text-sm font-semibold">
              Hello, {name}
            </span>
            <button
              onClick={() => dispatch(logoutUser())} // Dispatch logout action
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
    </nav>
  );
};

export default Navbar;
