import React from 'react';

const Hero = () => {
  const heroImage = "https://images.unsplash.com/photo-1718217213243-432ae99bfcdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA=="; // The image URL

  return (
    <section className="relative h-[80vh] max-h-[800px] min-h-[500px] w-full flex items-center overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Person meditating" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/70 to-black/40"></div>
      </div>
      
      <div className="relative z-10 max-w-xl px-8 ml-8 animate-fadeIn">
        <h1 className="font-poppins text-6xl font-semibold mb-6 text-white leading-tight">
          Want to Know More?
        </h1>
        <p className="font-inter text-xl text-white mb-8 leading-relaxed">
          Learn simple ways to feel stronger and tackle common mental health stuff in your MindSpace.
        </p>
      </div>
    </section>
  );
};

export default Hero;
