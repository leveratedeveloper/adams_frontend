'use client';

import Image from 'next/image';
import Header from '@/components/general/header';
import Link from 'next/link';
import { Footer } from '@/components/Footer';
import React,{ useEffect, useState } from "react";

export default function Page() {
    return (
        <>
            <Header />
            <div className="container mx-auto text-gray-700" style={{ paddingTop: '15vh' }}>
            <h1 className="text-2xl font-bold">Terms and Conditions for ADAMS SEO & ASO Services</h1>
                <p className="text-sm">Effective Date: 22 February 2025</p>
                <div className='mb-8'></div>
                <p>
                Welcome to ADAMS! By using our SEO (Search Engine Optimization) and ASO (App Store Optimization) services, you agree to abide by the following
                terms and conditions. Please read them carefully before engaging with our services.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">1. Acceptance of Terms</h2>
                <p>
                By accessing or using ADAMS services, you acknowledge that you have read, understood, and agree to be bound by these terms. If you do not agree
                with any part of these terms, you should refrain from using our services.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">2. Services Provided</h2>
                <p>
                ADAMS provides SEO and ASO services to improve the online visibility and search rankings of your website or mobile application. These services
                may include keyword research, on-page optimization, off-page optimization, content strategy, technical SEO, app store listing optimization, and
                analytics reporting.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">3. Client Responsibilities</h2>
                <p>
                Clients must provide accurate and complete information necessary for ADAMS to perform the services effectively. This includes but is not limited
                to website access, content approval, and timely feedback.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">4. No Guaranteed Result</h2>
                <p>
                While ADAMS employs best practices and industry-standard strategies, search engine and app store rankings are subject to algorithms and external
                factors beyond our control. We do not guarantee specific rankings or traffic results.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">5. Payment Terms</h2>
                <ul className="list-disc list-inside">
                <li>Clients agree to pay the fees as outlined in the agreed proposal or invoice.</li>
                <li>Payments must be made on time as per the agreed schedule.</li>
                <li>Failure to pay may result in suspension or termination of services.</li>
                </ul>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">6. Confidentiality</h2>
                <p>
                Both parties agree to maintain the confidentiality of sensitive business information shared during the course of engagement.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">7. Intellectual Property</h2>
                <p>
                All content, strategies, and reports created by ADAMS remain the property of ADAMS until full payment is received. Upon full payment, the client
                gains full rights to the deliverables.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">8. Termination of Services</h2>
                <p>
                Either party may terminate the agreement with a written notice of 60 days. ADAMS reserves the right to suspend or discontinue services in cases
                of non-compliance with these terms.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
                <p>
                ADAMS shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall
                not exceed the amount paid by the client for the service in question.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">10. Amendments</h2>
                <p>
                ADAMS reserves the right to update these terms and conditions at any time. Clients will be notified of any significant changes.
                </p>
                <div className='mb-8'></div>
                <h2 className="text-xl font-semibold">11. Governing Law</h2>
                <p>These terms shall be governed by and construed in accordance with the laws of Republic Indonesia.</p>
                <div className='mb-8'></div>
                <p>
                By continuing to use ADAMS services, you agree to these terms and conditions. If you have any questions, please contact us at{" "}
                <span className="font-semibold">info@adamsolutions.asia</span>.
                </p>
                <div className='mb-8'></div>
            </div>
            <Footer />
        </> 
    );
}