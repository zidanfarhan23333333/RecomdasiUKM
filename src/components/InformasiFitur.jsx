import React, { useState } from "react";
import Foto1 from "../assets/1.jpg";
import Foto2 from "../assets/2.jpg";
import Foto3 from "../assets/3.jpg";
import Foto4 from "../assets/4.png";

const fiturList = [
  {
    title: "Pencarian Pelatih mudah",
    description:
      "Nikmati kemudahan dalam menemukan pelatih yang sesuai dengan kebutuhan Anda melalui fitur pencarian yang intuitif. Pilih berdasarkan keahlian, pengalaman, atau jadwal yang sesuai dengan preferensi Anda.",
    image: Foto2,
  },
  {
    title: "Profil Pelatih Lengkap",
    description:
      "Dapatkan informasi mendetail tentang setiap pelatih, termasuk latar belakang pendidikan, sertifikasi, pengalaman, dan ulasan dari pengguna lain. Pastikan Anda memilih pelatih yang benar-benar memenuhi kebutuhan Anda.",
    image: Foto2,
  },
  {
    title: "Jadwal Transparan",
    description:
      "Nikmati kemudahan dalam menemukan pelatih yang sesuai dengan kebutuhan Anda melalui fitur pencarian yang intuitif. Pilih berdasarkan keahlian, pengalaman, atau jadwal yang sesuai dengan preferensi Anda.",
    image: Foto3,
  },
  {
    title: "Pencarian Pelatih mudah",
    description:
      "Nikmati kemudahan dalam menemukan pelatih yang sesuai dengan kebutuhan Anda melalui fitur pencarian yang intuitif. Pilih berdasarkan keahlian, pengalaman, atau jadwal yang sesuai dengan preferensi Anda.",
    image: Foto4,
  },
];

const InformasiFitur = () => {
  const [selectedFitur, setSelectedFitur] = useState(null);
  return (
    <section className="py-16  px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-left mb-4 border-l-4 border-blue-500 pl-4">
          Informasi Fitur
        </h2>
        <p className="text-gray-600 max-w-xl">
          Temukan pelatih yang tepat dengan sistem pencarian yang dirancang
          khusus untuk mempermudah pengguna berdasarkan kriteria seperti
          keahlian, lokasi, dan jadwal.
        </p>

        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg mt-6 mb-3">
          Lihat Semua
        </button>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {fiturList.map((fitur, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={fitur.image}
                alt={fitur.title}
                className="w-full h-[480px] object-cover"
              />
              {/* Overlay Blur dengan Gradient */}
              <div className="absolute bottom-0 w-full h-36 bg-gradient-to-t from-black/70 to-transparent backdrop-blur-lg flex flex-col justify-end p-5 space-y-2">
                <h3 className="text-lg font-bold text-white">{fitur.title}</h3>
                <p className="text-sm text-white line-clamp-2">
                  {fitur.description}
                </p>
                <button
                  onClick={() => setSelectedFitur(fitur)}
                  className="text-blue-300 text-sm font-medium mt-2"
                >
                  Lihat selengkapnya
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail */}
      {selectedFitur && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-200"
              onClick={() => setSelectedFitur(null)}
            >
              ✖
            </button>
            {/* Modal Content */}
            <img
              src={selectedFitur.image}
              alt={selectedFitur.title}
              className="w-full h-[250px] object-cover rounded-lg"
            />
            <h3 className="text-2xl font-bold mt-4">{selectedFitur.title}</h3>
            <p className="text-gray-700 mt-2">{selectedFitur.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default InformasiFitur;
