'use client';

import { useState } from 'react';
import Link from 'next/link';
import logoAdams from "../../public/img/Logo_Adams_Chillax.png";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-white via-white to-transparent backdrop-blur-lg fixed w-full z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">
            <Image src={logoAdams} alt="Logo" width={100} height={50} />
          </Link>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/">
            <Link className="text-gray-700 hover:text-blue-500" href={''}>Home</Link>
          </Link>
          <Link href="/about">
            <Link className="text-gray-700 hover:text-blue-500" href={''}>About</Link>
          </Link>
          <Link href="/services">
            <Link className="text-gray-700 hover:text-blue-500" href={''}>Services</Link>
          </Link>
          <Link href="/contact">
            <Link className="text-gray-700 hover:text-blue-500" href={''}>Contact</Link>
          </Link>
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
            <Link href="/">
              <Link
                              className="text-gray-700 hover:text-blue-500"
                              onClick={() => setIsMenuOpen(false)} href={''}              >
                Home
              </Link>
            </Link>
            <Link href="/about">
              <Link
                              className="text-gray-700 hover:text-blue-500"
                              onClick={() => setIsMenuOpen(false)} href={''}              >
                About
              </Link>
            </Link>
            <Link href="/services">
              <Link
                              className="text-gray-700 hover:text-blue-500"
                              onClick={() => setIsMenuOpen(false)} href={''}              >
                Services
              </Link>
            </Link>
            <Link href="/contact">
              <Link
                              className="text-gray-700 hover:text-blue-500"
                              onClick={() => setIsMenuOpen(false)} href={''}              >
                Contact
              </Link>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
