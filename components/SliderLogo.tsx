'use client'
import React from "react";

const SliderLogo: React.FC = () => {
  const logos = [
    {
      src: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65fd58d0ead0ab46cd67c4b4_Bestseller.svg",
      alt: "Bestseller",
    },
    {
      src: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65fd58d0045adba14a96183f_Reuters.svg",
      alt: "Reuters",
    },
    {
      src: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65fd58d051e0c6b71d068815_Teleperformance.svg",
      alt: "Teleperformance",
    },
    {
      src: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65fd58d0edc02126959809b5_Zoom.svg",
      alt: "Zoom",
    },
    {
      src: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65fd58d06c131a8af01315e0_Heineken.svg",
      alt: "Heineken",
    },
    {
      src: "https://cdn.prod.website-files.com/65e89895c5a4b8d764c0d710/65fd58d0ed2718f3cc1a54b4_Xerox.svg",
      alt: "Xerox",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {logos.map((logo, index) => (
        <div
          key={index}
          className="flex justify-center items-center w-[132px] h-[48px]"
        >
          <img
            src={logo.src}
            alt={logo.alt}
            loading="lazy"
            className="w-full h-auto object-contain"
          />
        </div>
      ))}
    </div>
  );
};

export default SliderLogo;
