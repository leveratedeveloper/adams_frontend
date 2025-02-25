'use client';

import Header from '@/components/general/header';
import { Footer } from '@/components/Footer';
import React,{ useEffect, useState } from "react";
import { useModal } from "../../contexts/ModalContext";
import Modal from "@/components/hubspotmodal/modal";

export default function Page() {
    const { isOpen, setIsOpen } = useModal();

    return (
        <>
        <div className="relative max-h-screen w-full">
                <Header />
            <main className="relative z-10 items-center justify-center min-h-screen">
                <div className="container mx-auto text-gray-700" style={{ paddingTop: '15vh' }}>
                
                    <h1 className="text-2xl font-bold">Disclaimer</h1>
                    <div className='mb-8'></div>
                    <p>The insights and recommendations provided by ADAMS SEO & ASO are based on an initial analysis using data sourced from third-party providers & artificial intelligence. While we strive to deliver accurate and up-to-date information, we do not guarantee the completeness, reliability, or accuracy of search volume, keyword rankings, or any other reported metrics.</p>
                    <div className='mb-8'></div>
                    <p>Search engine and app store algorithms are subject to frequent changes, which may impact rankings and visibility beyond our control. The recommendations provided should be used as guidance and do not guarantee specific results. Users are encouraged to conduct further research, consult with our experts, and consider multiple factors when optimizing their SEO and ASO strategies.</p>
                    <div className='mb-8'></div>
                    <p>By using this website, you acknowledge and agree that ADAMS SEO & ASO is not responsible for any decisions made based on the provided data and recommendations.</p>
                    <div className='mb-8'></div>
                    <p>If you have any questions, please contact us for further assistance.</p>
                    <div className='mb-8'></div>
                    <div className='md:p-8'></div>
                    <div className='md:p-8'></div>
                    <div className='md:p-4'></div>
                </div>
                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    {/* Embedded HubSpot Meeting */}
                    <iframe
                    src="https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment"
                    className="w-full h-96 border rounded"
                    allowFullScreen
                    ></iframe>
                </Modal>
            </main>
            <Footer />
        </div>
           
        </> 
    );
}