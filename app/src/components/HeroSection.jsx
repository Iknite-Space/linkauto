import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function App() {
  const navigate = useNavigate();
  return (
    <div className="font-sans mt-[90px]">
      {/* Hero Section */}
      <section id="home" className="relative px-4 py-12 overflow-hidden text-white bg-primary md:px-7 lg:px-7">
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
        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-10 py-5 mx-auto max-w-7xl md:flex-row">
          {/* Text Content */}
          <motion.div
            className="w-full px-4 py-6 -mt-4 text-center bg-transparent rounded-lg md:w-1/2 md:mt-0 md:text-left md:p-0"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="mb-2 text-3xl font-bold leading-tight sm:text-4xl md:text-5xl text-backgroundColor"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Rent the Car You Love, Anytime.
            </motion.h1>

            <motion.p
              className="text-base mb-14 sm:text-lg text-backgroundColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Affordable, convenient, and premium cars for your every journey.
            </motion.p>

            <motion.button
              onClick={() => navigate("/carlisting")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-sm font-medium transition rounded-lg shadow-md bg-accent text-backgroundColor sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Book Now
            </motion.button>
          </motion.div>

          {/* Car Image */}
          <motion.div
            className="z-10 flex items-end justify-center w-full md:w-1/2"
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
                src="./../assets/car1-herosection.png"
                alt="Car"
                className="object-contain w-full"
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
