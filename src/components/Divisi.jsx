import React from "react";
import Futsal from "../assets/futsal.png";
import Basket from "../assets/basket.png";
import Bulutangkis from "../assets/bulutangkis.png";
import Voli from "../assets/voli.png";
import Tkd from "../assets/tkd.png";
import Esport from "../assets/esport.png";

const Divisi = () => {
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
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
        <div className="text-center p-4 border rounded-lg shadow-lg hover:shadow-lg transition bg-blue-700">
          <h3 className="font-semibold text-white">Divisi Futsal</h3>
          <img src={Futsal} alt="Futsal" className="mb-2" />
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg hover:shadow-lg transition bg-blue-700">
          <h3 className="font-semibold text-white">Divisi Voli</h3>
          <img src={Voli} alt="Voli" className="mb-2" />
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg hover:shadow-lg transition bg-blue-700">
          <h3 className="font-semibold text-white">Divisi Basket</h3>
          <img src={Basket} alt="Basket" className="mb-2" />
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg hover:shadow-lg transition bg-blue-700">
          <h3 className="font-semibold text-white">Divisi Bulutangkis</h3>
          <img src={Bulutangkis} alt="Bulutangkis" className="mb-2" />
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg hover:shadow-lg transition bg-blue-700">
          <h3 className="font-semibold text-white">Divisi Taekwondo</h3>
          <img src={Tkd} alt="Taekwondo" className="mb-2" />
        </div>
        <div className="text-center p-4 border rounded-lg shadow-lg hover:shadow-lg transition bg-blue-700">
          <h3 className="font-semibold text-white">Divisi E-Sport</h3>
          <img src={Esport} alt="E-Sport" className="mb-2" />
        </div>
      </div>

      {/* text berjalan */}
      <div className="overflow-hidden mt-6">
        <div className="whitespace-nowrap text-xl font-semibold text-blue-700 animate-marquee">
          Divisi Futsal • Divisi Voli • Divisi Basket • Divisi Bulutangkis •
          Divisi Taekwondo • Divisi E-Sport •
        </div>
      </div>

      {/* animasi */}
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
