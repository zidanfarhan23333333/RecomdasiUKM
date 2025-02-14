import React from "react";
import { Link } from "react-router-dom";
import Banner from "../assets/3.jpg";
import { FaFacebookF, FaTiktok, FaInstagram } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center px-10 text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url(${Banner})` }}
      ></div>

      {/* Gradient Biru di Bagian Bawah */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-blue-900 via-transparent to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto ml-20 md:ml-40 lg:ml-48">
        {/* Gunakan margin lebih besar untuk sejajar dengan logo */}
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Temukan <span className="text-white">pelatih terbaik</span>
        </h1>
        <h2 className="text-5xl md:text-7xl font-bold text-yellow-400">
          Di UKM Olahraga Unimma
        </h2>
        <p className="mt-4 text-lg">
          Unit Kegiatan Mahasiswa Olahraga Universitas Muhammadiyah Magelang
        </p>

        {/* Tombol */}
        <Link
          to="/cari-pelatih"
          className="mt-6 inline-block bg-yellow-400 text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
        >
          Cari Pelatih Sekarang Juga →
        </Link>
      </div>

      {/* Social Media Floating Buttons */}
      <div className="absolute bottom-10 right-10 space-y-3">
        <a
          href="#"
          className="block p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <FaFacebookF size={24} />
        </a>
        <a
          href="#"
          className="block p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <FaTiktok size={24} />
        </a>
        <a
          href="#"
          className="block p-3 bg-white/20 rounded-full hover:bg-white/30 transition"
        >
          <FaInstagram size={24} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
