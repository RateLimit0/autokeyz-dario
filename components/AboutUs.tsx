import React from 'react';
import Image from 'next/image';
import Head from 'next/head';

const AboutUs: React.FC = () => {
  return (
    <>
      {/* Moved structured data to Head for non-blocking rendering */}
      <Head>
        {/* Structured Data for SEO */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Organization",
            "name": "AutoKeyz",
            "url": "https://www.autokeyz.com/",
            "logo": "https://www.autokeyz.com/images/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+4407769017971",
              "contactType": "Customer Service",
              "areaServed": "GB",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://www.facebook.com/autokeyz",
              "https://twitter.com/autokeyz",
              "https://www.instagram.com/autokeyz"
            ]
          })}
        </script>
      </Head>

      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 gap-10 flex flex-col lg:flex-row items-center">
          {/* Text Section */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">About AutoKeyz</h2>
            <h3 className="text-2xl font-semibold text-gray-600 mb-6">Who We Are</h3>
            <p className="text-gray-700 mb-4">
              At AutoKeyz, we lead in superior car key replacement services across the UK, specialising in Jaguar key replacement and Range Rover key replacement. Our team of professionals has years of experience dedicated to delivering the best service, providing you with true peace of mind.
            </p>
            <p className="text-gray-700 mb-4">
              We understand the significance of swift, reliable service, especially when you need an emergency car key replacement or car key fob battery replacement. Whether you're located in urban hubs such as London, Bristol, or Manchester, we can ensure prompt service. We handle everything from keyless entry systems to lost car key replacement. Our mission is to deliver high-quality solutions quickly and efficiently.
            </p>
            <h3 className="text-2xl font-semibold text-gray-600 mb-6">Our Commitment</h3>
            <p className="text-gray-700 mb-4">
              Customer satisfaction is a key objective at AutoKeyz. We know that getting locked out or needing to replace your Jaguar or Range Rover key can be extremely frustrating. In light of this, we also offer emergency locksmith assistance and callouts.
            </p>
            <p className="text-gray-700">
              AutoKeyz has your back. Put your trust in us, and we won’t fail you. When it comes to Jaguar and Range Rover auto key needs, we are your one-stop shop. <a href="#contact" className="text-blue-600 underline">Contact us today</a> to learn more about our car key services.
            </p>
          </div>
          {/* Image Section */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="https://images.autokeyz.co.uk/images/about.png"
              alt="AutoKeyz Team at Work"
              className="rounded-lg shadow-lg max-w-full h-auto"
              width={600} // Intrinsic width in pixels
              height={400} // Intrinsic height in pixels
              layout="responsive" // Makes the image responsive
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
