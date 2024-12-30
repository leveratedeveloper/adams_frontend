'use client';

import { useState } from "react";

export default function HowItWorks() {
    const [isMobileView, setIsMobileView] = useState(false);
  return (
    <div className="text-center mb-10 mt-10">
      <div>
        <h1 className="text-6xl font-bold">
          <span>Boost your ranking</span>
        </h1>
        <span className="gradient-text block">Maximize Visibility</span>
        <p className="text-sm text-gray-600 max-w-md mx-auto mt-4">
          Accurate & efficient way to grow your website SEO easily. Powered by cutting-edge technology of Leverate Asia.
        </p>
      </div>
  </div>
  );
}
