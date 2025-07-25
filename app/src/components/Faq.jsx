import { motion } from "framer-motion";
import AccordionDemo from "./Accordion";

const Faq = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4  ">
      <div className="w-screen bg-gray-100 shadow-xl rounded-lg p-6 py-10 border-t border-gray-300  mt-8">
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* Left: Image with animation */}
          <motion.div
            className="w-full max-w-xl h-auto"
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            animate={{ y: [0, -5, 0] }}
            transition={{
              x: { duration: 0.6, ease: "easeOut" },
              y: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
            viewport={{ once: true }}
          >
            <motion.img
              src="/assets/faq.png"
              alt="FAQ"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
              className="w-full h-auto object-contain rounded-xl"
            />
          </motion.div>

          {/* Right: Text + Accordion with animation */}
          <motion.div
            className="flex flex-col items-center justify-center lg:items-center w-full lg:w-auto"
            viewport={{ once: true }}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex-1 text-center lg:text-center w-full">
              <h2 className="text-black font-bold">FAQ</h2>
              <motion.h1
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-3xl font-bold mb-4"
              >
                Frequently Asked Questions
              </motion.h1>
              <p className="text-lg text-gray-600 mb-6">
                Here are some common questions and answers to help you
                understand our service better.
              </p>

              <div className="flex justify-center lg:justify-start">
                <div className="w-full max-w-xl">
                  <AccordionDemo />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
