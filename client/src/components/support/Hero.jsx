import React from 'react';

const Hero = () => {
  return (
    <div className="relative w-full h-[550px]">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/30"
        style={{
          backgroundImage: "url('https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: 'cover',
          backgroundPosition: 'top'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 to-gray-900/30"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-4 h-[450px] flex items-center">
          <div className="max-w-2xl">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg inline-block">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Mental Health Matters
              </h1>
              <p className="text-lg text-white/90">
                Supporting your journey to wellness with professional resources and compassionate care.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
