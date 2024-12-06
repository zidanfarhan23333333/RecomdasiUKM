import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-gray-300 py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Heal Shoes</h2>
        <p className="text-sm text-white mb-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam
          magnam vitae corporis tempora soluta facilis perferendis earum iusto
          eligendi architecto!
        </p>

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

        <div className="flex justify-center space-x-6 mb-6">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedin].map(
            (Icon, index) => (
              <a
                key={index}
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                <Icon size={20} />
              </a>
            )
          )}
        </div>

        {/* Copyright */}
        <p className="text-white text-sm">
          &copy; 2024 Heal. Semua Hak Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
