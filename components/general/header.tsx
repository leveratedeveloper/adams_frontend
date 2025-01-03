'use client';

import { useState } from 'react';
import Link from 'next/link';
import logoAdams from "../../public/img/Logo_Adams_Chillax_New.webp";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleScroll = (id: string) => {
    const targetDiv = document.getElementById(id);
    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" }); // Smooth scroll
    }
  };
  return (
    <header className="bg-gradient-to-r from-white via-white to-transparent backdrop-blur-lg fixed w-full z-50">
      <div className="container mx-auto px-4 flex items-center h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">
            <Image src={logoAdams} alt="Logo" width={150} height={50} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="flex items-center justify-between w-full px-4 py-2 ">
        {/* Left content or logo (optional) */}
        <div className="hidden md:flex space-x-6">
          <Link href="/#how-it-works" className="text-gray-700 hover:text-blue-500">
            How It Works
          </Link>
          <Link href="/#why-adams" className="text-gray-700 hover:text-blue-500">
            Why Adams
          </Link>
          <Link href="/#proven-results" className="text-gray-700 hover:text-blue-500">
            Proven Results
          </Link>
        </div>
        
        {/* Button on the far right */}
        <button
          className="ml-auto button-gradient bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition flex items-center gap-2"
          onClick={() => alert('Button Clicked!')}>
          Consult Now
        </button>
      </nav>


        {/* Hamburger Menu */}
        <button
          className="md:hidden flex items-center text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            <Link href="/#how-it-works" className="text-gray-700 hover:text-blue-500">
              How It Works
            </Link>
            <Link href="/#why-adams" className="text-gray-700 hover:text-blue-500">
              Why Adams
            </Link>
            <Link href="/#proven-results" className="text-gray-700 hover:text-blue-500">
              Proven Results
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
