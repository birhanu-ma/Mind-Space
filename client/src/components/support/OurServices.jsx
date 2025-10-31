import React from 'react';

const OurServices = () => {
  return (
    <section className="py-16 px-4 md:px-8 bg-blue-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-semibold mb-12 text-center">Our Comprehensive Services</h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <img 
              src="https://images.pexels.com/photos/3768917/pexels-photo-3768917.jpeg" 
              alt="Mental health counseling office" 
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">
              Comprehensive Support for youth Well-being
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-md">
                <ul className="list-disc pl-6 space-y-2">
                  <li>Empowering Mental Health Education</li>
                  <li>Practical Self-Care Toolkit</li>
                  <li>Anonymous Peer Support Forums</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-md">
                <ul className="list-disc pl-6 space-y-2">
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
