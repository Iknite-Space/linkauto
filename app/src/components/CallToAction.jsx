import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react"; 
import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section
      id="call-to-action"
      className="relative px-6 py-24 text-center bg-center bg-no-repeat bg-contain md:px-10"
      style={{
        backgroundImage: `url('./../assets/Car1.png')`, 
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 z-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <p className="mb-2 text-lg font-semibold tracking-wide uppercase text-accent">
          Ready to hit the road?
        </p>

        <h2 className="mb-10 text-3xl font-bold text-white md:text-5xl">
          Book your ride in seconds
        </h2>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex justify-center mb-4"
        >
          <ChevronDown size={32} className="text-accent" />
        </motion.div>

        <Link
          to="/carlisting"
          className="inline-block px-8 py-4 text-lg font-semibold text-white transition-all duration-300 shadow-lg bg-gradient-to-r from-accent to-secondary rounded-2xl hover:scale-105 hover:shadow-xl"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
