import React from "react";
import { motion } from "framer-motion"; // ✅ Import framer-motion
import Futsal from "../assets/futsal.png";
import Basket from "../assets/basket.png";
import Bulutangkis from "../assets/bulutangkis.png";
import Voli from "../assets/voli.png";
import Tkd from "../assets/tkd.png";
import Esport from "../assets/esport.png";

const Divisi = () => {
  const divisiList = [
    { name: "Divisi Futsal", img: Futsal },
    { name: "Divisi Voli", img: Voli },
    { name: "Divisi Basket", img: Basket },
    { name: "Divisi Bulutangkis", img: Bulutangkis },
    { name: "Divisi Taekwondo", img: Tkd },
    { name: "Divisi E-Sport", img: Esport },
  ];

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-left mb-4 border-l-4 border-blue-500 pl-4">
        Divisi <br /> UKM Olahraga
      </h2>
      <p className="text-left max-w-xl mb-10">
        UKM Olahraga Universitas Muhammadiyah Magelang memiliki 6 divisi utama,
        yaitu Futsal, Basket, Taekwondo, Bulutangkis, Esport, dan Voli. Setiap
        divisi dirancang untuk mengakomodasi minat dan bakat mahasiswa dalam
        bidang olahraga tertentu. Semua divisi tersebut berada di bawah naungan
        UKM Olahraga.
      </p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mb-6">
        Lihat Semua
      </button>

      {/* Grid Divisi */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        {divisiList.map((divisi, index) => (
          <div
            key={index}
            className="text-center p-4 border rounded-lg shadow-lg hover:shadow-xl transition bg-blue-700"
          >
            <h3 className="font-semibold text-white">{divisi.name}</h3>
            {/* Hanya logonya yang bergerak naik-turun */}
            <motion.img
              src={divisi.img}
              alt={divisi.name}
              className="mt-2 w-32 h-32 mx-auto object-contain" // ✅ Perbesar logo
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }} // ✅ Efek floating hanya pada logo
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        ))}
      </div>

      {/* Text Berjalan */}
      <div className="overflow-hidden mt-6">
        <div className="whitespace-nowrap text-xl font-semibold text-blue-700 animate-marquee">
          Divisi Futsal • Divisi Voli • Divisi Basket • Divisi Bulutangkis •
          Divisi Taekwondo • Divisi E-Sport •
        </div>
      </div>

      {/* Animasi */}
      <style>
        {`
          @keyframes marquee {
            from { transform: translateX(100%); }
            to { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 10s linear infinite;
          }
        `}
      </style>
    </section>
  );
};

export default Divisi;
