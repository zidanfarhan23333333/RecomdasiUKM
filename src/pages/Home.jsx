import React from "react";
import Hero from "../components/Hero";
import Divisi from "../components/Divisi";
import InformasiFitur from "../components/InformasiFitur";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2 }} // Animasi berjalan setiap kali masuk viewport
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
