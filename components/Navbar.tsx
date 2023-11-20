"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-white text-lg font-semibold">eLearning Calendar</h1>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <a href="/" className="text-white hover:text-gray-300">Home</a>
            <a href="/about" className="text-white hover:text-gray-300">About</a>
            <a href="/services" className="text-white hover:text-gray-300">Services</a>
            <a href="/contact" className="text-white hover:text-gray-300">Contact</a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={toggleNavbar} className="text-white">
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <a href="/" className="block py-2 px-4 text-white">Home</a>
          <a href="/about" className="block py-2 px-4 text-white">About</a>
          <a href="/services" className="block py-2 px-4 text-white">Services</a>
          <a href="/contact" className="block py-2 px-4 text-white">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
