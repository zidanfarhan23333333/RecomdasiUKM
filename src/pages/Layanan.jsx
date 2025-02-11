import React from "react";
import layanan from "../assets/1.jpg";
import Futsal from "../assets/futsal.png";
import Voli from "../assets/voli.png";
import Basket from "../assets/basket.png";
import Bulutangkis from "../assets/bulutangkis.png";
import Taekwondo from "../assets/tkd.png";
import ESport from "../assets/esport.png";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Layanan = () => {
  const navigate = useNavigate();
  const divisi = [
    {
      nama: "Futsal",
      gambar: Futsal,
      deskripsi:
        "Pelatih Futsal di UKM Olahraga UNIMMA menyediakan pelatihan teknik dasar hingga strategi lanjut, meliputi passing, shooting, dribbling, dan penguasaan taktik. Fokus pada peningkatan performa individu dan kerja sama tim.",
      keuntungan: [
        "Latihan intensif dengan metode terkini.",
        "Pelatihan untuk turnamen lokal hingga profesional.",
        "Evaluasi performa untuk pengembangan pemain.",
      ],
    },
    {
      nama: "Voli",
      gambar: Voli,
      deskripsi:
        "Pelatih Voli di UKM Olahraga UNIMMA menawarkan sesi pelatihan teknik seperti servis, smash, passing, dan blocking. Cocok untuk individu atau tim yang ingin meningkatkan kemampuan bertanding.",
      keuntungan: [
        "Pelatih berpengalaman dengan teknik profesional.",
        "Latihan taktik untuk pertandingan resmi.",
        "Program fisik untuk daya tahan dan kecepatan.",
      ],
    },
    {
      nama: "Basket",
      gambar: Basket,
      deskripsi:
        "Pelatih Basket di UKM Olahraga UNIMMA mengajarkan teknik dasar hingga strategi permainan, termasuk dribbling, shooting, passing, serta kerja sama tim.",
      keuntungan: [
        "Latihan dengan pelatih bersertifikasi.",
        "Fokus pada teknik individu dan strategi tim.",
        "Persiapan untuk kompetisi antarkampus dan profesional.",
      ],
    },
    {
      nama: "Bulutangkis",
      gambar: Bulutangkis,
      deskripsi:
        "Pelatih Bulutangkis di UKM Olahraga UNIMMA menyediakan latihan intensif mulai dari footwork, smash, dropshot, hingga strategi bertanding.",
      keuntungan: [
        "Latihan teknik dasar hingga lanjutan.",
        "Sesi khusus untuk pemain tunggal dan ganda.",
        "Pendampingan dalam turnamen bulutangkis.",
      ],
    },
    {
      nama: "Taekwondo",
      gambar: Taekwondo,
      deskripsi:
        "Pelatih Taekwondo di UKM Olahraga UNIMMA memberikan pelatihan bela diri profesional, meliputi teknik tendangan, pertahanan diri, dan strategi bertarung.",
      keuntungan: [
        "Latihan bersama atlet berpengalaman.",
        "Sesi untuk pemula hingga tingkat sabuk hitam.",
        "Fokus pada kekuatan, kelincahan, dan mental bertanding.",
      ],
    },
    {
      nama: "E-Sport",
      gambar: ESport,
      deskripsi:
        "Divisi E-Sport UKM Olahraga UNIMMA menawarkan pelatihan profesional untuk berbagai game kompetitif, meliputi strategi, teamwork, dan mental bertanding.",
      keuntungan: [
        "Pelatihan dengan pro player dan coach berpengalaman.",
        "Strategi dan analisis gameplay kompetitif.",
        "Kesempatan bertanding di turnamen nasional dan internasional.",
      ],
    },
  ];
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-4xl font-bold text-left mb-4 mt-20 border-l-4 border-blue-500 pl-4">
        Layanan
      </h2>
      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Gambar dipotong bagian atas dan sejajar navbar */}
        <img
          src={layanan}
          alt="Sejarah UKM Olahraga"
          className="w-full h-[400px] md:h-[500px] object-cover object-top"
        />

        {/* Overlay Blur & Gradient */}
        <div className="absolute bottom-0 w-full h-62 bg-gradient-to-t from-blue-900/90 via-blue-800/80 to-transparent backdrop-blur-lg flex flex-col justify-end p-6">
          {/* Judul UKM Olahraga */}
          <h3 className="text-white text-4xl font-bold">Layanan Pelatih</h3>

          {/* Deskripsi */}
          <p className="text-white text-md leading-relaxed text-justify mt-2">
            "Dapatkan pelatihan olahraga terbaik di UNIMMA! Kami menyediakan
            pelatih bersertifikasi untuk berbagai cabang olahraga seperti
            Taekwondo, Bulutangkis, Basket, Sepak Bola, Esport, dan banyak lagi.
            Nikmati jadwal yang fleksibel, sesi pelatihan personal, serta
            bimbingan yang dirancang untuk membantu Anda mencapai tujuan
            olahraga Anda."
          </p>
        </div>
      </div>

      {/* looping divisi */}
      {divisi.map((item, index) => (
        <div key={index} className="mt-16">
          {/* nama divisi */}
          <h2 className="text-5xl md:text-4xl font-bold text-left mb-4 mt-20 border-l-4 border-blue-500 pl-4">
            Divisi{item.nama}
          </h2>

          {/* container untuk gambar dan deskripsinya */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <motion.img
              src={item.gambar}
              alt={item.nama}
              className="w-80 rounded-lg shadow-lg bg-blue-600"
              initial={{ y: 0 }}
              animate={{ y: [0, -10, 0] }} // ✅ Efek floating hanya pada logo
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Deskripsi */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-blue">Deskripsi</h3>
              <p className="text-gray-700 mt-2">{item.deskripsi}</p>

              <h3 className="text-2xl font-bold text-blue-600 mt-4">
                Keuntungan
              </h3>
              <ul className="list-disc pl-6 text-gray-700">
                {item.keuntungan.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>

              <button
                onClick={() => navigate("/tentang")}
                className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
              >
                Cari Pelatih
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Layanan;
