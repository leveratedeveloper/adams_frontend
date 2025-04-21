'use client';
import  TabContent  from './tab-content/page';
import Image from "next/image";
import logoAdams from "../public/img/Logo_Adams_Chillax.png";
import Header from '../components/general/header';
import HowItWorks from '@/components/Howitworks';
import WhyAdams from '@/components/Whyadams';
import ProvenResult from '@/components/ProvenResult';
import Boost from '@/components/Boost';
import LogoCarousel from '@/components/LogoCarousel';
import { useState } from 'react';
import Modal from "@/components/hubspotmodal/modal";
import { useModal } from "../contexts/ModalContext";
import { Footer } from '@/components/Footer';

export default function Home() {
   const { isOpen, setIsOpen } = useModal();
  return (
    <><div className="relative min-h-screen w-full">
      <Header />
      <meta name="google-site-verification" content="1Poi8wX7ceY0CI0EBBNAxlcj53xrcmm7jl6RRxHcSNo" />
      <div className="absolute inset-0 backdrop-blur-lg" style={{
        backgroundImage: `url('../public/img/background_adams.webp')`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        filter: 'blur(10px)', // Additional CSS blur if needed
      }}
      ></div>
      <main className="relative z-10 items-center justify-center min-h-screen bg-[url('../public/img/background_adams.webp')] bg-no-repeat md:bg-contain bg-top overflow-x-hidden">
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-1">
          {/* Logo and Header */}
          <Boost />

          {/* Main Content */}
          <TabContent></TabContent>
          {/* Trusted by Section */}
          <div className='wrapper'>
            <div className="text-center mt-20">
              <div className="inline-flex justify-center items-center bg-white bg-opacity-30 border-white border rounded-full md:px-4 sm:p-2  space-x-1 sm:space-x-2">
                <span className="font-bold text-sm sm:text-base text-black">Trusted by</span>
                <span className="font-bold text-sm sm:text-base gradient-text-well-known">well known</span>
                <span className="font-bold text-sm sm:text-base">companies</span>
              </div>
            </div>

            {/* Slider */}
            <div className="flex items-center justify-center max-w-full overflow-hidden">
              <LogoCarousel />
            </div>
          </div>

          {/* Additional Sections */}
          <HowItWorks />
          <WhyAdams />
          <ProvenResult />
        </div>
        {/* Modal */}
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {/* Embedded HubSpot Meeting */}
          <iframe
            src="https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment"
            className="w-full h-96 border rounded"
            allowFullScreen
          ></iframe>
        </Modal>
      </main>
    </div><Footer /></>
  );
}