import Image from 'next/image';

const LogoCarousel = () => {
  const logos = [
    '/img/client-logos/logo_colour_allianz.png',
    '/img/client-logos/logo_colour_bri.png',
    '/img/client-logos/logo_colour_bussan autofinance baf.png',
    '/img/client-logos/logo_colour_home credit.png',
    '/img/client-logos/logo_colour_maybank sekuritas.png',
    '/img/client-logos/logo_colour_merries.png',
    '/img/client-logos/logo_colour_msig.png',
    '/img/client-logos/logo_colour_unicef.png',
  ];

  return (
    <div className="carousel">
      <div className="carousel-track">
        {logos.map((logo, index) => (
          <div key={index} className="carousel-item">
            <Image src={logo} alt={`Client ${index + 1}`} width={150} height={75} />
          </div>
        ))}
        {logos.map((logo, index) => ( // Duplicate for seamless looping
          <div key={`dup-${index}`} className="carousel-item">
            <Image src={logo} alt={`Client ${index + 1}`} width={150} height={75} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoCarousel;
