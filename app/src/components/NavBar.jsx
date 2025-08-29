import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../hooks/UseAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const { currentUser = null} = useUser() || {};
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-primary ">
      <div className="flex items-center justify-between p-4 md:px-10 md:py-6">
        {/* Left: Logo and Brand */}
        <Link to="/">
        <div className="flex items-center space-x-0">
            <img
              src="./../assets/single-logo-accent.png"
              alt="Logo"
              className="object-contain w-10 h-10 md:h-12 md:w-12"
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
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden w-full md:flex">
          <div className="flex justify-center flex-1 space-x-6 text-heading2 text-backgroundColor">
            
            <div className="relative group">
              <button className="hover:text-accent">Cars</button>
              <div className="absolute hidden group-hover:block bg-primary shadow-lg rounded-md mt-2 w-40">
                <Link to="/carlisting" className="px-4 py-2 block hover:text-accent">Car Listing</Link>
                <Link to="/upload-car-page" className="px-4 py-2 block hover:text-accent">Upload Car</Link>
              </div>
            </div>
            <a href="/#home" className="hover:text-accent">Home</a>
            <a href="/#about-us" className="hover:text-accent">About Us</a>
            <a href="/#contact" className="hover:text-accent">Contact</a>
            
            
          </div>
          {(currentUser?.uuid) ? (
            <Link title="Go to dashboard" to="/dashboard" className="px-4 py-2 text-white rounded shadow bg-accent text-button hover:bg-secondary">Dashboard</Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-white hover:text-accent">Login</Link>
              <Link to="/register" className="px-4 py-2 text-white rounded shadow bg-accent text-button hover:bg-secondary">Register</Link>
            </div>
          )}
        </div>

        {/* Small screen: Login Button (styled) */}
        <div className="flex items-center space-x-3 md:hidden">
          {(currentUser?.uuid) ? (
            <Link title="Go to dashboard" to="/dashboard" className="px-4 py-2 text-white rounded shadow bg-accent text-button hover:bg-secondary">Dashboard</Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="px-3 py-2 text-sm text-white rounded shadow bg-accent hover:bg-secondary">Login</Link>
            </div>
          )}
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
        <div className="flex flex-col px-6 pb-4 space-y-2 text-sm text-white md:hidden bg-primary">
          {[
            { label: "Home", link: "/#home" },
            { label: "About Us", link: "/#about-us" },
            { label: "Contact", link: "/#contact" },
            { label: "Cars", link: "/carlisting" },
          ].map(({ label, link }) => (
            <Link
              key={label}
              to={link}
              className="px-3 py-2 transition duration-200 rounded hover:bg-secondary hover:text-accent focus:bg-secondary focus:text-accent active:bg-secondary active:text-accent"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
