import React from "react";
import Prabu from "../assets/prabu.png";
import Zulham from "../assets/zulham.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Riwayat = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-4xl mx-auto p-6 mt-20">
      <button
        onClick={() => navigate("/pembayaran/:id")}
        className="text-blue-600 mb-4"
      >
        &larr; Kembali
      </button>

      <h2 className="text-2xl font-bold mb-4">Riwayat Pesanan</h2>

      {/* perlu dibayar */}
      <h3 className="text-lg font-semibold">Perlu Dibayar:</h3>
      <div className="bg-blue-600 text-white p-4 rounded-lg flex justify-between items-center shadow-lg mt-2">
        <div className="flex items-center gap-4 flex-1">
          <motion.img
            src={Zulham}
            alt="zulham"
            className="w-20 h-20 rounded-full object-cover bg-white"
            initial={{ y: 0 }}
            animate={{ y: [0, -10, 0] }} // ✅ Efek floating hanya pada logo
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div>
            <h4 className="text-white text-xl font-semibold">Zulham Maulana</h4>
            <p className="text-sm">Rp.50.000/Pertemuan</p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-semibold">Batas Pembayaran</p>
          <p className="text-sm">10-11 Pm, Selasa 1 Januari 2025</p>
        </div>
      </div>
      <h3 className="text-lg font-semibold mt-4">Selesai Pembayaran:</h3>
      {[1, 2, 3].map((index) => (
        <div
          key={index}
          className="bg-gray-300 text-gray-500 p-4 rounded-lg flex items-center justify-between shadow mt-2"
        >
          <div className="flex items-center gap-4 flex-1">
            <motion.img
              src={Prabu}
              alt="zulham"
              className="w-20 h-20 rounded-full object-cover bg-white"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }} // ✅ Efek floating hanya pada logo
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <div>
              <h4 className="text-white text-xl font-semibold">Prabu Fauzan</h4>
              <p className="text-sm">Rp.50.000/Pertemuan</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold">Selesai transaksi pada:</p>
            <p className="text-sm">10-11 Pm, Selasa 1 Januari 2025</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Riwayat;
