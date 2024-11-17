import React, { useMemo } from 'react';
import { FaKey, FaLockOpen, FaCar, FaClock } from 'react-icons/fa';

const OurServices = React.memo(() => {
  const services = useMemo(() => [
    {
      name: "Spare Keys",
      description: "Mobile service for spare keys, supplied and programmed with a 12-month guarantee.",
      icon: <FaKey />,
      keywords: "spare keys, mobile car key service, car key replacement, car key programming, professional key services, 12-month guarantee",
    },
    {
      name: "All Keys Lost",
      description: "Emergency call-out for vehicle access, new keys supplied, and programmed with a 12-month guarantee.",
      icon: <FaLockOpen />,
      keywords: "emergency car key replacement, emergency key fob replacement, vehicle opening, Car Keys lost",
    },
    {
      name: "Keyless Vehicle Module",
      description: "Replacement and programming of KVM modules for seamless keyless entry.",
      icon: <FaCar />,
      keywords: "keyless vehicle module, KVM replacement, car key programming, keyless entry system",
    },
    {
      name: "Emergency Call Out",
      description: "Emergency service for vehicle opening and new car keys supplied and programmed.",
      icon: <FaClock />,
      keywords: "emergency call out, lost car key emergency call out, emergency car key replacement, urgent key replacement service, 24/7 car key emergency call out",
    },
  ], []);

  const structuredData = useMemo(() => JSON.stringify({
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
    "service": services.map(service => ({
      "@type": "Offer",
      "name": service.name,
      "description": service.description,
      "keywords": service.keywords,
      // Corrected image reference to a plausible URL instead of trying to use React element
      "image": `https://www.autokeyz.com/images/${service.name.replace(/ /g, '').toLowerCase()}-logo.png`
    }))
  }), [services]);

  return (
    <section className="bg-gray-900 p-6 my-6 rounded-lg text-white text-center md:text-left" aria-label="Our Car Key Services">
      <h2 className="text-3xl font-bold mb-8">Our Car Key Services</h2>
      <p className="text-gray-400 mb-6">
        At AutoKeyz, we offer a range of professional automotive key services to meet all your needs. Our experienced team uses the latest technology to ensure fast and reliable service.
      </p>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        {services.map((service) => (
          <div key={service.name} className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="w-16 h-16 mb-4 flex justify-center items-center bg-gray-700 rounded-full text-3xl">
              {service.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
            <p className="text-gray-400">{service.description}</p>
            <meta name="keywords" content={service.keywords} />
          </div>
        ))}
      </div>
      
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
    </section>
  );
});

export default OurServices;
