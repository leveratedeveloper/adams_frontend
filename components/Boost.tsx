'use client';

import { useState } from "react";

export default function HowItWorks() {
    const [isMobileView, setIsMobileView] = useState(false);
  return (
    <div className="text-center mb-10 mt-14">
      <div>
        <h1 className="text-6xl" style={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
          <span>Boost your keyword ranking,</span>
        </h1>
        <span className="text-6xl gradient-text" style={{ fontFamily: 'Chillax', fontWeight: 500 }}>maximize visibility</span>
        <p className="text-sm text-gray-600 max-w-md mx-auto mt-4">
        Wondering how to identify the right keywords for SEO & ASO? Start with ADAMS.
        AI-powered, automated digital marketing solutions to grow your website & mobile app traffic organically.
        </p>
      </div>
    </div>
  );
}
