'use client';

import { Triangle } from 'lucide-react';
import Link from 'next/link';
import logoAdams from "../public/img/Adams_logo_white.png";
import Image from "next/image";
import { useModal } from "../contexts/ModalContext";

export function Footer() {
  const { setIsOpen } = useModal();

  return (
    <footer className="w-full bg-[#111111] text-white py-1">
      <div className="container mx-auto px-8 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center space-x-2">
        <Image src={logoAdams} alt="Adams Logo" className="h-1/6 w-48" />
      </div>

        <div className="text-sm text-gray-400 my-4 md:my-0">
          © 2025 ADAMS Indonesia - All right reserved.
        </div>
        
        <div className="flex items-center space-x-6 text-xs md:mb-0 sm:mb-4">
          <Link href="/privacy-policy" className="hover:text-gray-300 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-condition" className="hover:text-gray-300 transition-colors">
            Terms & Condition
          </Link>
          <Link href="/disclaimer" className="hover:text-gray-300 transition-colors">
            Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}