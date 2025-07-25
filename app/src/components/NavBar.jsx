import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-primary fixed top-0 left-0 w-full z-50 ">
      <div className="flex items-center justify-between p-4 md:px-10 md:py-6">
        {/* Left: Logo and Brand */}
        <div className="flex items-center space-x-0">
          <img
            src="./../assets/single-logo-accent.png"
            alt="Logo"
            className="h-10 w-10 object-contain md:h-12 md:w-12"
          />
          <div className="flex flex-col items-start">
            <span className="text-logoName text-[23px] md:text-logoName font-bold text-backgroundColor">
              LinkAuto
            </span>
            <span className="text-slogan text-[9px] md:text-slogan text-accent">
              Just pick, drive, and go
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center w-full">
          <div className="flex-1 flex justify-center space-x-6 text-heading2 text-backgroundColor">
            <a href="#home" className="hover:text-accent">Home</a>
            <a href="#about-us" className="hover:text-accent">About Us</a>
            <a href="#why-choose-us" className="hover:text-accent">Why Choose Us</a>
            <a href="#testimonials" className="hover:text-accent">Testimonials</a>
            <a href="#contact" className="hover:text-accent">Contact</a>
            <a href="#faq" className="hover:text-accent">FAQ</a>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-white hover:text-accent">Login</Link>
            <Link to="/register" className="bg-accent text-white text-button px-4 py-2 rounded hover:bg-secondary shadow">Register</Link>
          </div>
        </div>

        {/* Small screen: Login Button (styled) */}
        <div className="flex items-center md:hidden space-x-3">
          <a
            href="#"
            className="bg-accent text-white px-3 py-2 rounded text-sm shadow hover:bg-secondary"
          >
            Login
          </a>
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with hover and active styles */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-6 pb-4 space-y-2 text-sm bg-primary text-white">
          {[
            "Home",
            "About Us",
            "Why Choose Us",
            "Testimonials",
            "Contact",
            "FAQ",
          ].map((label) => (
            <a
              key={label}
              href="#"
              className="px-3 py-2 rounded transition duration-200
                         hover:bg-secondary hover:text-accent
                         focus:bg-secondary focus:text-accent
                         active:bg-secondary active:text-accent"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
