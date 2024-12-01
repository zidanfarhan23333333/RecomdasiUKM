import { Link } from "react-router-dom";
import Heal from "../assets/heal.jpg";
import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img src={Heal} alt="Logo" className="h-16 w-auto object-contain" />
        </Link>
      </div>

      <div className="flex-grow flex justify-center items-center gap-x-8 ml-8">
        <ul className="flex space-x-6 text-blue-600 text-sm font-semibold">
          <li className="cursor-pointer hover:text-blue-800">Casual</li>
          <li className="cursor-pointer hover:text-blue-800">Formal</li>
          <li className="cursor-pointer hover:text-blue-800">Sneakers</li>
        </ul>
      </div>

      <div className="flex gap-6 items-center">
        <Link to="/cart" className="text-gray-600 text-sm hover:underline">
          <FiShoppingCart size={20} /> Cart
        </Link>
        <Link to="/login" className="text-blue-600 text-sm hover:underline">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
