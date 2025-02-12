import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Futsal from "../assets/futsal.png";
import Bulutangkis from "../assets/bulutangkis.png";
import Taekwondo from "../assets/tkd.png";
import Prabu from "../assets/prabu.png";
import Zulham from "../assets/zulham.png";
import Rama from "../assets/rama.png";
import Riza from "../assets/riza.png";

const coaches = [
  {
    name: "Prabu Fauzan",
    division: "Taekwondo",
    experience: "3-4 Tahun",
    achievement: "Medali Emas UGM CUP",
    price: "10000,00",
    time: "Rabu 14:00",
    image: Prabu,
    logo: Taekwondo,
  },
  {
    name: "Riza Putri Anggraini",
    division: "Taekwondo",
    experience: "3-4 Tahun",
    achievement: "Medali Perak UGM CUP",
    price: "10000,00",
    time: "Rabu 14:00",
    image: Riza,
    logo: Taekwondo,
  },
  {
    name: "Zulham Maulana",
    division: "Futsal",
    experience: "3-4 Tahun",
    achievement: "Medali Emas UGM CUP",
    price: "10000,00",
    time: "Rabu 14:00",
    image: Zulham,
    logo: Futsal,
  },
  {
    name: "Herdyan Rama",
    division: "Bulutangkis",
    experience: "3-4 Tahun",
    achievement: "Medali Emas UGM CUP",
    price: "10000,00",
    time: "Rabu 14:00",
    image: Rama,
    logo: Bulutangkis,
  },
];

const DetailPelatih = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const coach = coaches[id];

  if (!coach) {
    return <p className="text-center text-red-600">Pelatih tidak ditemukan</p>;
  }

  return (
    <section className="py-16 px-4 max-w-3xl mx-auto mt-20">
      <button className="text-blue-500 mb-4" onClick={() => navigate(-1)}>
        &larr; Kembali
      </button>
      <div className="relative bg-white p-8 rounded-xl shadow-lg text-center">
        {/* Foto Pelatih */}
        <div className="relative w-36 h-36 mx-auto border-4 border-gray-300 shadow-lg rounded-xl overflow-hidden">
          <img
            src={coach.image}
            alt={coach.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Logo Divisi */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -top-10 w-20 h-20 bg-white p-2 rounded-full border-2 border-gray-300 shadow">
          <img
            src={coach.logo}
            alt={coach.division}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Informasi Pelatih */}
        <h2 className="text-2xl font-bold mt-4">{coach.name}</h2>
        <p className="text-gray-500">Pelatih {coach.division}</p>

        {/* Detail Informasi */}
        <div className="grid grid-cols-2 gap-6 mt-4 text-sm">
          <div>
            <p className="text-gray-500">Pengalaman</p>
            <p className="text-blue-500 font-semibold">{coach.experience}</p>
          </div>
          <div>
            <p className="text-gray-500">Prestasi</p>
            <p className="text-blue-500 font-semibold">{coach.achievement}</p>
          </div>
          <div>
            <p className="text-gray-500">Biaya</p>
            <p className="text-green-500 font-semibold">● {coach.price}</p>
          </div>
          <div>
            <p className="text-gray-500">Waktu</p>
            <p className="text-green-500 font-semibold">● {coach.time}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mt-4 flex justify-center items-center gap-1 text-yellow-400">
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <p className="text-gray-500">4.0</p>
        </div>

        {/* Deskripsi */}
        <div className="mt-6 text-gray-700 text-sm leading-relaxed">
          <p>
            Pelatih {coach.division} adalah individu yang memiliki keahlian
            dalam melatih atlet untuk menguasai teknik, strategi, dan
            keterampilan yang dibutuhkan dalam olahraga ini. Mereka membantu
            atlet dalam mencapai performa terbaik melalui latihan yang intensif
            dan terarah.
          </p>
        </div>

        {/* Tombol Booking */}
        <button
          onClick={() => navigate("/pembayaran")}
          className="mt-6 bg-blue-600 text-white py-3 w-full rounded-lg hover:bg-blue-700 transition"
        >
          Booking Pelatih
        </button>
      </div>
    </section>
  );
};

export default DetailPelatih;
