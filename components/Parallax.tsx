import React, { useMemo } from 'react';
import Image from 'next/image';

const Parallax: React.FC = () => {
  const structuredData = useMemo(
    () =>
      JSON.stringify({
        "@context": "http://schema.org",
        "@type": "Service",
        "serviceType": "Automotive Key Services",
        "provider": {
          "@type": "Organization",
          "name": "AutoKeyz",
          "url": "https://www.autokeyz.com/",
          "logo": "https://www.autokeyz.com/images/logo.png",
          "sameAs": [
            "https://www.facebook.com/autokeyz",
            "https://twitter.com/autokeyz",
            "https://www.instagram.com/autokeyz"
          ]
        },
        "areaServed": {
          "@type": "Place",
          "name": "Ashford, Kent"
        },
        "description": "At AutoKeyz, we pride ourselves on delivering exceptional service and reliability. With years of experience and state-of-the-art equipment, we ensure your automotive key needs are met swiftly and efficiently."
      }),
    []
  );

  return (
    <section
      className="relative h-96 flex items-center justify-center overflow-hidden"
      aria-label="Why Choose AutoKeyz"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.autokeyz.co.uk/images/dooropen.jpg"
          alt="Door Opening"
          layout="fill"
          objectFit="cover"
          quality={75} // Adjust quality as needed
          priority
        />
        <div className="absolute inset-0 bg-black opacity-40"></div>
      </div>
      <div className="relative w-full sm:w-2/3 lg:w-1/4 h-full bg-white bg-opacity-75 p-6 flex flex-col justify-center shadow-lg text-gray-900">
        <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
        <p className="text-lg">
          At <strong>AutoKeyz</strong>, we pride ourselves on delivering exceptional service and reliability. With years of experience and state-of-the-art 
          equipment, we ensure your automotive key needs are met swiftly and efficiently. Choose us for our expertise, commitment to quality, 
          and customer-focused approach.
        </p>
      </div>
      
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </section>
  );
};

export default Parallax;
