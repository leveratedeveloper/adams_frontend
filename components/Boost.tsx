'use client';

import { useState } from "react";

export default function HowItWorks() {
    const [isMobileView, setIsMobileView] = useState(false);
  return (
    <div className="text-center mb-10 mt-14">
      <div>
        <h1 className="text-6xl" style={{ fontFamily: 'Chillax, sans-serif', fontWeight: 500 }}>
          <span>Boost your ranking,</span>
        </h1>
        <span className="gradient-text" style={{ fontFamily: 'Chillax' }}>maximize visibility</span>
        <p className="text-sm text-gray-600 max-w-md mx-auto mt-4">
          Automated digital marketing solutions to grow your website & mobile app organically.
        </p>
      </div>
    </div>
  );
}
