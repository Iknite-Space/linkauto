import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-16">
      <div className="grid items-center grid-cols-1 gap-10 md:grid-cols-2">
        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="about-2.jpg"
            alt="Our Team"
            className="w-full shadow-md rounded-2xl"
          />
        </motion.div>

        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-5"
        >
          <h2 className="text-2xl font-bold text-gray-800">About LinkAuto</h2>
          <h2 className="hidden text-5xl font-bold lg:block">You start the engine and your adventure begins</h2>
          <p className="leading-relaxed text-gray-600">
            We’re more than just a car rental company. We’re a team of passionate
            individuals who believe in making travel easy, affordable, and reliable.
            Whether {`you're`} relocating, traveling across states, or just exploring a
            new city — {`we're`} here to move with you.
          </p>
          <p className="leading-relaxed text-gray-600">
            Founded in 2024, our goal has always been to bring transparency,
            flexibility, and trust into the car rental industry. Today, we proudly
            serve hundreds of happy customers every week.
          </p>
          <p className="leading-relaxed text-gray-600">
            Our mission is simple: <strong>drive freedom forward</strong>. No long queues,
            no hidden fees, just smooth journeys from start to finish.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
