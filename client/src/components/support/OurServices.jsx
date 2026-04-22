import React from 'react';

const OurServices = () => {
  return (
    <section className="py-16 px-4 sm:h-screen mt-24 md:px-8 bg-gray-50">
      <div className="">
        <h2 className="text-3xl font-semibold mb-12 text-center text-gray-900">
          Our Comprehensive Services
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <div className="flex-1 rounded-lg overflow-hidden border border-gray-200">
            <img
              src="https://images.pexels.com/photos/3768917/pexels-photo-3768917.jpeg"
              alt="Mental health counseling office"
              className="w-full sm:h-80 object-cover"
            />
            {/* Optional subtle overlay */}
            <div className="absolute inset-0 bg-black/10 rounded-lg"></div>
          </div>

          {/* Content Section */}
          <div className="flex-1 bg-white sm:p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-900">
              Comprehensive Support for Youth Well-being
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 transition-colors duration-300 hover:bg-gray-50">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Empowering Mental Health Education</li>
                  <li>Practical Self-Care Toolkit</li>
                  <li>Anonymous Peer Support Forums</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white p-6 rounded-lg border border-gray-200 transition-colors duration-300 hover:bg-gray-50">
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Direct Access to Licensed Counselors</li>
                  <li>Immediate Crisis Support Resources</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
