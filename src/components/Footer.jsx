import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-10 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Kolom 1 - Tentang UKM */}
        <div>
          <h3 className="text-2xl font-bold">UKM Olahraga UNIMMA</h3>
          <p className="mt-2 text-sm text-gray-300">
            Menyediakan pelatihan olahraga profesional bagi mahasiswa UNIMMA.
            Bergabunglah dengan kami dan kembangkan bakat olahragamu!
          </p>
        </div>

        {/* Kolom 2 - Kontak */}
        <div>
          <h3 className="text-2xl font-bold">Kontak</h3>
          <p className="mt-2 flex items-center gap-2 text-gray-300">
            <FaMapMarkerAlt /> Jl. Raya Unimma No. 12, Magelang
          </p>
          <p className="mt-1 flex items-center gap-2 text-gray-300">
            <FaPhone /> +62 812-3456-7890
          </p>
          <p className="mt-1 flex items-center gap-2 text-gray-300">
            <FaEnvelope /> ukmolahraga@unimma.ac.id
          </p>
        </div>

        {/* Kolom 3 - Sosial Media */}
        <div>
          <h3 className="text-2xl font-bold">Ikuti Kami</h3>
          <div className="flex gap-4 mt-3">
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white text-blue-900 rounded-full hover:bg-blue-600 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white text-blue-900 rounded-full hover:bg-pink-500 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="w-10 h-10 flex items-center justify-center bg-white text-blue-900 rounded-full hover:bg-blue-400 hover:text-white transition"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Garis Pembatas */}
      <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm text-gray-300">
        &copy; {new Date().getFullYear()} UKM Olahraga UNIMMA. All rights
        reserved.
      </div>
    </footer>
  );
}

export default Footer;
