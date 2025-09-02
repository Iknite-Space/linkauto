import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useUser } from "../hooks/UseAuth";

Modal.setAppElement("#root"); // Accessibility requirement

export default function UploadCarHero() {
  const { currentUser } = useUser();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    if (currentUser?.role === "car_owner") {
      navigate("/dashboard/cars/upload");
    } else {
      setModalOpen(true);
    }
  };

  return (
    <div className="font-sans mt-[94px]">
      <section className="relative px-4 py-20 overflow-hidden bg-secondary md:px-12 lg:px-20">
        {/* Decorative Circle Top Right */}
        <div className="absolute -top-16 -right-20 w-[300px] h-[300px] bg-accent rounded-full opacity-70 z-0"></div>

        {/* Content Section */}
        <div className="relative z-10 flex flex-col-reverse items-center justify-between gap-10 mx-auto max-w-7xl md:flex-row">
          
          {/* Image Section */}
          <motion.div
            className="z-10 flex items-center justify-center w-full md:w-1/2"
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
          >
            <motion.div
              animate={{ y: ["0px", "-12px"] }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-full max-w-[450px] sm:max-w-[600px] md:max-w-[700px]"
            >
              <img
                src="./../assets/uploadcar.png"
                alt="Upload Car"
                className="object-contain w-full transform scale-x-[-1]"
              />
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="w-full text-center md:w-1/2 md:text-left"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h2
              className="mb-4 text-3xl font-bold leading-snug text-backgroundColor sm:text-4xl md:text-5xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Turn Your Car <br /> Into Extra Income
            </motion.h2>

            <motion.p
              className="mb-10 text-base text-heading2 sm:text-lg text-backgroundColor"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Don’t let your car sit idle. List it on <span className="font-semibold text-primary"> LinkAuto </span>
            and start earning today while helping people get where they need to go.
            </motion.p> 

            <motion.button
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-sm font-medium transition rounded-lg shadow-md bg-accent text-backgroundColor sm:text-base"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Start Earning
            </motion.button>
          </motion.div>
        </div>

        {/* Decorative Circle Bottom Left */}
        <div className="absolute -bottom-28 -left-28 w-[300px] h-[300px] bg-primary rounded-full opacity-70 z-0"></div>
      </section>

      {/* Login Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Login Required"
        className="bg-white p-8 max-w-sm w-full rounded-xl shadow-2xl relative"
        overlayClassName="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Login Required</h2>
        <p className="mb-6 text-center">
          You must log in as a <strong>car owner</strong> to upload your car.
        </p>
        <div className="flex justify-center">
          <button
            className="px-6 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </Modal>
    </div>
  );
}
