import React from "react";
import { motion } from "framer-motion";

export default function App() {
  return (
    <div className="font-sans">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-12 px-4 md:px-10 lg:px-16 overflow-hidden">
        {/* Decorative Background Circle (Top Left) */}
        <div className="absolute top-[20px] left-[20px] 
          w-[150px] h-[150px] md:top-[-100px] md:left-[-150px] md:w-[400px] md:h-[400px] 
          bg-secondary rounded-full opacity-30 z-0">
        </div>

        {/* Yellow Ellipse Behind Car — visible only on md and up */}
        <div className="hidden md:block absolute -bottom-28 right-[-250px] 
          w-[800px] h-[410px] bg-accent rounded-[50%] z-0 rotate-[12deg] opacity-17">
        </div>

        {/* Content Section */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <motion.div
            className="w-full md:w-1/2 -mt-4 md:mt-0 text-center md:text-left 
              bg-transparent px-4 py-6 md:p-0 rounded-lg"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-backgroundColor leading-tight"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Rent the Car You Love, Anytime.
            </motion.h1>

            <motion.p
              className="mb-14 text-base sm:text-lg text-backgroundColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Affordable, convenient, and premium cars for your every journey.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent text-backgroundColor text-sm sm:text-base font-medium px-6 py-3 rounded-lg shadow-md transition"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Book Now
            </motion.button>
          </motion.div>

          {/* Car Image */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center items-end z-10"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          >
            <motion.div
              animate={{ y: ["0px", "-15px"] }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full max-w-[450px] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px]"
            >
              <img
                src="./../assets/car3.png"
                alt="Car"
                className="w-full object-contain"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Background Circle (Bottom Left) — brought above text */}
        <div className="absolute bottom-[-300px] left-[-100px] ml-[250px] 
          w-[400px] h-[400px] bg-black rounded-full opacity-30 z-20">
        </div>
      </section>
    </div>
  );
}
