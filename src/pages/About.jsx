import { useState } from "react";
import Sejarah from "../assets/2.jpg";
import Farhan from "../assets/Farhan.jpg";
import Ucup from "../assets/ucup.png";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const About = () => {
  const [reviews, setReviews] = useState([
    {
      name: "Farhan Azidan",
      review: "Sangat membantu dalam meningkatkan prestasi olahraga di kampus!",
      rating: 5,
    },
    {
      name: "Restu",
      review: "Program kerja yang sangar inovativ",
      rating: 4.5,
    },
  ]);
  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 0,
  });

  const handleReviewSubmit = () => {
    if (newReview.name && newReview.review && newReview.rating > 0) {
      setReviews([...reviews, newReview]);
      setNewReview({ name: "", review: "", rating: 0 });
    }
  };
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

      {/* Review Pengguna */}
      <h2 className="text-5xl md:text-4xl font-bold text-left mb-4 mt-20 border-l-4 border-blue-500 pl-4">
        Review Pengguna
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center mt-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-lg font-bold">{review.name}</h3>
            <p className="text-gray-600 text-sm mt-2">{review.review}</p>
            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < review.rating ? "text-yellow-500" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 bg-blue-600 rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-white">Tambahkan Review</h3>
        <input
          type="text"
          placeholder="Nama"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          className="w-full p-2 mb-3 border-rounded"
        />
        <textarea
          placeholder="Ulasan"
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
          className="w-full p-2 mb-3 border rounded"
        />
        <div className="flex mb-3">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < newReview.rating ? "text-yellow-500" : "text-gray-300"
              }
              onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
            />
          ))}
        </div>
        <button
          onClick={handleReviewSubmit}
          className="bg-white text-blue px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Tambahkan Review
        </button>
      </div>
    </section>
  );
};

export default About;
