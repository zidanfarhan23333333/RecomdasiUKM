import React, { useState } from "react";
import { FaSearch, FaChevronDown, FaEllipsisH } from "react-icons/fa";
import Futsal from "../assets/futsal.png";
import Bulutangkis from "../assets/bulutangkis.png";
import Taekwondo from "../assets/tkd.png";
import Prabu from "../assets/prabu.png";
import Zulham from "../assets/zulham.png";
import Rama from "../assets/rama.png";
import Riza from "../assets/riza.png";
import { Navigate, useNavigate } from "react-router-dom";

const trainers = [
  {
    name: "Prabu Fauzan",
    division: "Taekwondo",
    experience: "3-4 Tahun",
    achievement: "Medali Emas UGM CUP",
    price: "10000,00",
    time: "Rabu",
    image: Prabu,
    logo: Taekwondo,
  },
  {
    name: "Riza Putri Anggraini",
    division: "Taekwondo",
    experience: "3-4 Tahun",
    achievement: "Medali Perak UGM CUP",
    price: "10000,00",
    time: "Rabu",
    image: Riza,
    logo: Taekwondo,
  },
  {
    name: "Zulham Maulana",
    division: "Futsal",
    experience: "3-4 Tahun",
    achievement: "Medali Emas UGM CUP",
    price: "10000,00",
    time: "Rabu",
    image: Zulham,
    logo: Futsal,
  },
  {
    name: "Herdyan Rama",
    division: "Bulutangkis",
    experience: "3-4 Tahun",
    achievement: "Medali Emas UGM CUP",
    price: "10000,00",
    time: "Rabu",
    image: Rama,
    logo: Bulutangkis,
  },
];

const SearchCoach = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleFilterChange = (division) => {
    setSelectedFilters((prev) =>
      prev.includes(division)
        ? prev.filter((item) => item !== division)
        : [...prev, division]
    );
  };

  return (
    <section className="py-10 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-6 mt-20">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search Divisi"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute right-3 top-3 text-gray-500" />
        </div>

        <div className="relative z-50">
          <button
            className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white shadow"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Filter Pelatih
            <FaChevronDown />
          </button>
          {isDropdownOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white border rounded-lg shadow-lg p-2">
              {["pengalaman", "prestasi", "ketersediaan waktu"].map(
                (division) => (
                  <li
                    key={division}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.includes(division)}
                      onChange={() => handleFilterChange(division)}
                    />
                    {division}
                  </li>
                )
              )}
            </ul>
          )}
        </div>

        <button className="px-6 py-2 bg-yellow-400 text-white rounded-lg shadow">
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {trainers.map((coach, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg relative flex flex-col items-center text-center"
          >
            <div className="relative w-full h-40 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={coach.image}
                alt={coach.name}
                className="w-full h-full object-cover"
              />
              <img
                src={coach.logo}
                alt="Division Logo"
                className="absolute bottom-2 left-2 w-10 h-10 rounded-full shadow-md"
              />
            </div>
            <h3 className="mt-4 text-xl font-bold">{coach.name}</h3>
            <p className="text-gray-500">{coach.division}</p>
            <p className="text-gray-500 text-sm">
              Pengalaman: {coach.experience}
            </p>
            <p className="text-gray-500 text-sm">
              Prestasi: {coach.achievement}
            </p>
            <p className="text-green-500 font-bold mt-2">Rp {coach.price}</p>
            <button
              onClick={() => navigate(`/pelatih/${index}`)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow"
            >
              Detail
            </button>
            <FaEllipsisH className="absolute top-2 right-2 text-gray-500 cursor-pointer" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchCoach;
