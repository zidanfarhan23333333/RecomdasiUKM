import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Hero1 from "../assets/hero1.png";
import Var2 from "../assets/var2.png";
import Var3 from "../assets/var3.png";

const Hero = () => {
  const images = [Hero1, Var2, Var3];
  const [currentImage, setCurrentImageIndex] = useState(0);

  // Update image every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change image every 1 second
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [images.length]);

  // Intersection Observer with threshold 0.1 for smooth triggering
  const [ref, inView] = useInView({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{
        opacity: inView ? 1 : 0.5,
        y: inView ? 0 : 50, // Add slight vertical movement when in view
      }}
      transition={{ duration: 1 }} // Smooth transition for opacity and y change
      className="bg-[#f3f4f6] px-6 py-12 md:px-16 md:py-16"
    >
      <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-lg p-8">
        <div className="text-center md:text-left flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2c3e50]">
            HealShop Exclusive Deals
          </h1>
          <p>
            Discover the best deals on health and wellness products. Up to{" "}
            <span className="text-blue-600 font-bold">50% OFF</span> on selected
          </p>
          <button className="mt-6 px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg">
            Shop Now
          </button>
        </div>
        <div className="mt-8 md:mt-0 flex-1">
          <img
            src={images[currentImage]}
            alt="hero"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Hero;
