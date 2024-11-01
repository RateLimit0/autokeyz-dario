// components/Reviews.tsx

import React from 'react';

const Reviews: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900 text-white" aria-label="Customer Reviews">
      <div className="container mx-auto px-6 lg:px-16">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Customer Reviews</h2>
          <p className="text-lg text-gray-300">
            Don't just take our word for it. See what our customers have to say about our services!
          </p>
        </div>

        {/* Sample Reviews */}
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Review Card 1 */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <blockquote className="mb-4">
              <p className="text-lg italic">
                "Great service from the company from start to finish. Dave was very knowledgeable about my Land Rover and programmed and cut my new key without a problem."
              </p>
            </blockquote>
            <p className="text-right font-semibold">— Steve</p>
          </div>

          {/* Review Card 2 */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <blockquote className="mb-4">
              <p className="text-lg italic">
                "Super efficient. Really know what they are doing. Turned up on time. Very polite and all done promptly. Excellent,"
              </p>
            </blockquote>
            <p className="text-right font-semibold">— XX</p>
          </div>

          {/* Review Card 3 */}
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <blockquote className="mb-4">
              <p className="text-lg italic">
                "Reliable and trustworthy. They got my key programmed in no time."
              </p>
            </blockquote>
            <p className="text-right font-semibold">— Guy Landymore</p>
          </div>
        </div>

        {/* Trustpilot Button */}
        <div className="mt-12 text-center">
          <a
            href="https://uk.trustpilot.com/review/autokeyz.co.uk"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-400 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
          >
            {/* Trustpilot Star Logo */}
            <img
              src="https://images.autokeyz.co.uk/images/trustpilot.webp"
              alt="Trustpilot Star Logo"
              className="h-6 w-6 mr-3"
            />
            Read More Reviews
          </a>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
