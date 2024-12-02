import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        {/* Logo and Description */}
        <h2 className="text-2xl font-bold text-white mb-2">Heal Shoes</h2>
        <p className="text-sm text-gray-400 mb-6">
          Meningkatkan Pembelian Sepatu dengan baik.
        </p>

        {/* Navigation Links */}
        <div className="flex justify-center space-x-8 mb-6">
          {["Home", "About Us", "Services", "Contact"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase().replace(" ", "")}`}
              className="hover:text-white transition duration-300"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map(
            (Icon, index) => (
              <a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition duration-300"
              >
                <Icon size={20} />
              </a>
            )
          )}
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          &copy; 2024 Heal. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
