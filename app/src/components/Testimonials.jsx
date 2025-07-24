import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Amara E.",
    role: "Businesswoman",
    image: "./../assets/testimonial1.png",
    quote:
      "Through LinkAuto, I’ve been able to enjoy smooth, stress-free trips.",
  },
  {
    name: "Brian M.",
    role: "Photographer",
    image: "./../assests/testimonial2.png",
    quote:
      "The car was clean, ready, and the booking took less than 5 minutes!",
  },
  {
    name: "Fatima K.",
    role: "Entrepreneur",
    image: "./../assets/testimonial3.png",
    quote:
      "Great service and easy process. LinkAuto really gets it right.",
  },
  {
    name: "Fatima K.",
    role: "Entrepreneur",
    image: "./../assets/testimonial4.png",
    quote:
      "Great service and easy process. LinkAuto really gets it right.",
  },
  {
    name: "Fatima K.",
    role: "Entrepreneur",
    image: "./../assets/testimonial5.png",
    quote:
      "Great service and easy process. LinkAuto really gets it right.",
  },
  {
    name: "Fatima K.",
    role: "Entrepreneur",
    image: "./../assets/testimonial6.png",
    quote:
      "Great service and easy process. LinkAuto really gets it right.",
  },
];

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

 
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-primary py-20 px-6 md:px-20 text-center rounded-md">
      <h2 className="text-3xl md:text-4xl font-bold text-backgroundColor mb-3">
        Testimonials
      </h2>
      <p className="text-accent text-sm mb-10">See what people are saying.</p>

      <div className="relative bg-secondary rounded-3xl p-8 md:p-16 shadow-lg max-w-4xl mx-auto overflow-hidden">
        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent text-white rounded-full p-2 shadow-md hover:bg-secondary"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent text-white rounded-full p-2 shadow-md hover:bg-secondary"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            {/* Left: Image & Design */}
            <div className="relative">
             <div className="absolute inset-0 bg-accent rounded-full -z-10 scale-110"></div>
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="w-36 h-36 md:w-48 md:h-48 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>

            {/* Right: Text */}
            <div className="max-w-xl text-left mt-6 md:mt-0">
              <p className="text-backgroundColor italic mb-4 leading-relaxed">
                “{testimonials[index].quote}”
              </p>
              <p className="text-accent font-bold text-lg">{testimonials[index].name}</p>
              <p className="text-backgroundColor text-sm">{testimonials[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, i) => (
            <div
              key={i}
              className={`h-2 w-6 rounded-full transition-all duration-300 ${
                i === index ? "bg-accent" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
