import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; 

export default function CallToAction() {
  return (
    <section
      id="call-to-action"
      className="relative text-center py-24 px-6 md:px-10 bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('./../assets/Car1.png')`, 
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="text-accent text-lg mb-2 font-semibold tracking-wide uppercase">
          Ready to hit the road?
        </p>

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-10">
          Book your ride in seconds
        </h2>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex justify-center mb-4"
        >
          <ChevronDown size={32} className="text-accent" />
        </motion.div>

        <a
          href="#book"
          className="inline-block bg-gradient-to-r from-accent to-secondary text-white text-lg font-semibold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          Book Now
        </a>
      </div>
    </section>
  );
}
