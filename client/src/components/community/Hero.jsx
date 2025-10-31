import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/939702/pexels-photo-939702.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Silhouette of people on a hilltop" 
          className="w-full h-full object-cover brightness-50"
        />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-lg text-white mt-16">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Find Your MindSpace Connect, Share, Support.
          </h1>
          <div className="text-lg md:text-xl font-light leading-relaxed">
            <p className="mb-2">Join a vibrant community of fellow university students who understand.</p>
            <p className="mb-2">Share your experiences, offer encouragement,</p>
            <p>and find the support you need in a safe and understanding space.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
