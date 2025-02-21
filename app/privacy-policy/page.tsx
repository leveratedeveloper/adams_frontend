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
            <Header />
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                {/* Embedded HubSpot Meeting */}
                <iframe
                src="https://meetings-eu1.hubspot.com/meetings/adamsmeeting/appointment"
                className="w-full h-96 border rounded"
                allowFullScreen
                ></iframe>
            </Modal>
            <div className="container mx-auto text-gray-700" style={{ paddingTop: '15vh' }}>
            
                <h1 className="text-2xl font-bold">Privacy Policy</h1>
                <p className='text-sm'>Effective Date: 22 February 2025</p>
                <div className='mb-8'></div>
                <p>ADAMS Solutions ("we," "our," or "us") values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">1. Information We Collect</h2>
                <p>When you use our website, we may collect the following types of personal information:</p>
                <ul className="list-disc list-inside">
                <li><strong>Personal Identifiable Information (PII):</strong> Name, email address, phone number.</li>
                <li><strong>Automatically Collected Data:</strong> IP address, browser type, and website usage data through cookies and analytics tools.</li>
                </ul>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
                <p>We may use the collected information for the following purposes:</p>
                <ul className="list-disc list-inside">
                <li>To provide and manage our services.</li>
                <li>To communicate with you regarding inquiries, services, and updates.</li>
                <li>To improve our website, user experience, and customer support.</li>
                <li>To comply with legal obligations and enforce our terms.</li>
                </ul>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">3. Sharing of Information</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. However, we may share your information with:</p>
                <ul className="list-disc list-inside">
                <li><strong>Service Providers:</strong> Third-party vendors who assist in website operations, such as hosting, analytics, and customer support.</li>
                <li><strong>Legal Compliance:</strong> If required by law, we may disclose information to government authorities.</li>
                </ul>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">4. Data Security</h2>
                <p>
                We implement security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of 
                transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">5. Your Rights and Choices</h2>
                <p>You have the right to:</p>
                <ul className="list-disc list-inside">
                <li>Access, update, or delete your personal data by contacting us.</li>
                <li>Opt-out of marketing emails by following the unsubscribe link.</li>
                <li>Restrict or object to data processing where applicable.</li>
                </ul>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">6. Cookies and Tracking Technologies</h2>
                <p>We use cookies and similar technologies to enhance your experience on our website. You can control cookies through your browser settings.</p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">7. Third-Party Links</h2>
                <p>Our website may contain links to external sites. We are not responsible for the privacy practices of third-party websites.</p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">8. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date.</p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <p className="font-semibold">Email: info@adamsolutions.asia</p>
                <div className='mb-8'></div>
                <p className='mb-8'>By using our website, you consent to the terms of this Privacy Policy.</p>
            </div>
            <Footer />
           
        </> 
    );
}