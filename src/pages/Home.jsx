import React, { useContext } from "react";
import Hero from "../components/Hero";
import Divisi from "../components/Divisi";
import InformasiFitur from "../components/InformasiFitur";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`relative min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      {/* Tombol Toggle Mode */}
      <button
        onClick={toggleTheme}
        className="absolute top-5 right-5 px-4 py-2 rounded bg-gray-300 dark:bg-gray-800 text-black dark:text-white border border-gray-500 dark:border-white shadow-md"
      >
        {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={sectionVariants}
      >
        <Hero />
      </motion.div>

      {/* Divisi Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={sectionVariants}
      >
        <Divisi />
      </motion.div>

      {/* InformasiFitur Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }}
        variants={sectionVariants}
      >
        <InformasiFitur />
      </motion.div>
    </div>
  );
};

export default Home;
