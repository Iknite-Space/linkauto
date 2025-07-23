import React from "react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-700 text-white py-10 px-6 overflow-hidden">
        {/* Decorative Background Circle (Top Left) */}
        <div className="absolute top-[-100px] left-[-150px] w-[400px] h-[400px] bg-indigo-600 rounded-full opacity-30 z-0"></div>

        {/* Half-Ellipse Behind Car */}
        <div className="absolute -bottom-28 right-[-180px] w-[800px] h-[400px] bg-accent rounded-[50%] z-0 rotate-[12deg]"></div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Text Content */}
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0 z-10"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-4 text-backgroundColor"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Rent the Car You Love, Anytime.
            </motion.h1>
            <motion.p
              className="mb-6 text-lg text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Affordable, convenient, and premium cars for your every journey.
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-md transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Book Now
            </motion.button>
          </motion.div>

          {/* Car Image */}
          <motion.div
            className="relative md:w-3/4 flex justify-center items-end z-10"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            <img
              src="./../assets/car3.png"
              alt="Car"
              className="w-[1000px] object-contain"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
