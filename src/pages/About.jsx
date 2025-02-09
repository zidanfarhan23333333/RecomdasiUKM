import React from "react";
import Sejarah from "../assets/2.jpg";
import Farhan from "../assets/Farhan.jpg";
import Ucup from "../assets/ucup.png";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-5xl md:text-4xl font-bold text-left mb-4 mt-20 border-l-4 border-blue-500 pl-4">
        Sejarah
      </h2>

      <div className="relative rounded-xl overflow-hidden shadow-lg">
        {/* Gambar dipotong bagian atas dan sejajar navbar */}
        <img
          src={Sejarah}
          alt="Sejarah UKM Olahraga"
          className="w-full h-[400px] md:h-[500px] object-cover object-top"
        />

        {/* Overlay Blur & Gradient */}
        <div className="absolute bottom-0 w-full h-62 bg-gradient-to-t from-blue-900/90 via-blue-800/80 to-transparent backdrop-blur-lg flex flex-col justify-end p-6">
          {/* Judul UKM Olahraga */}
          <h3 className="text-white text-4xl font-bold">UKM Olahraga</h3>

          {/* Deskripsi */}
          <p className="text-white text-md leading-relaxed text-justify mt-2">
            UKM Olahraga berdiri pada tanggal 9 September tahun 2000, organisasi
            ini bertujuan untuk memberikan wadah terhadap mahasiswa yang suka
            olahraga supaya bisa lebih berkembang, namun pada waktu itu
            organisasi ini pernah vakum sekitaran 8 tahunan karena tidak ada
            yang mau mendanai dan kurang peminat, dan pada tahun 2011 ada
            seorang mahasiswa yang mempunyai tekad untuk membangun organisasi
            ini lagi supaya olahraga di Unimma menjadi lebih maju dan mempunyai
            struktur yang jelas untuk menjalankan estafet kepemimpinan.
          </p>
        </div>
      </div>

      {/* visi misi */}
      <h2 className="text-5xl md:text-4xl font-bold text-left mb-4 mt-20 border-l-4 border-blue-500 pl-4">
        Visi Misi <span className="font-bold"> UKM Olahraga</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <motion.div
          className="bg-blue-600 rounded-xl overflow-hidden shadow-lg relative w-fit h-fit mt-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <motion.img
            src={Ucup}
            alt="Ketua Umum"
            className="w-64 h-64 object-cover rounded-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <div className="absolute bottom-0 w-full h-62 bg-gradient-to-t from-blue-900/90 via-blue-800/80 to-transparent backdrop-blur-lg flex flex-col justify-center p-6">
            <h3 className="text-white font-bold text-lg text-center leading-tight">
              Yusuf Yuda Satria
            </h3>
            <p className="text-white text-center text-sm leading-tight">
              Ketua Umum UKM
            </p>
          </div>
        </motion.div>

        {/* visi */}
        <div className="-ml-60">
          <h3 className="text-4xl text-left font-bold mb-4 mt-10">Visi</h3>
          <p className="text-lg italic">
            “Menjadikan UKM Olahraga sebagai pelopor utama dalam menciptakan
            kreatifitas, prestasi dan Inovasi”
          </p>
        </div>
      </div>

      {/* Misi */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h3 className="text-4xl font-bold mb-4">Misi</h3>
          <ul className="list-decimal pl-6 text-lg space-y-2">
            <li>Mewujudkan rasa kekeluargaan antara UKM.</li>
            <li>
              Menciptakan wadah dalam meningkatkan kreatifitas, prestasi dan
              Inovasi.
            </li>
            <li>Menciptakan program kerja unggul dan kreatif.</li>
            <li>Menjalin komunikasi dan kerjasama yang baik.</li>
          </ul>
        </div>
        <motion.div
          className="bg-blue-600 rounded-xl overflow-hidden shadow-lg relative w-fit h-fit mt-10 mr-10 ml-auto"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        >
          <motion.img
            src={Farhan}
            alt="Wakil Ketua UKM"
            className="w-64 h-64 object-cover rounded-lg"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-blue-900/90 via-blue-800/80 to-transparent p-4">
            <h3 className="text-white text-lg font-bold text-center leading-tight">
              M. Farhan Azidan
            </h3>
            <p className="text-white text-sm text-center leading-tight">
              Wakil Ketua Umum UKM Olahraga UNIMMA
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
