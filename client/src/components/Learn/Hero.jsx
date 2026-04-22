import React from "react";

const Hero = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1718217213243-432ae99bfcdb?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==";

  return (
    <section className="relative h-screen w-full flex items-center justify-center md:justify-start overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Person meditating"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50 md:bg-gradient-to-r md:from-black/80 md:to-transparent"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 w-full px-6 md:px-0 md:ml-16 max-w-[90%] md:max-w-xl animate-fadeIn">
        <h1 className="font-poppins text-3xl sm:text-5xl md:text-6xl font-semibold mb-4 text-white leading-tight text-center md:text-left">
          Want to Know More?
        </h1>
        <p className="font-inter text-base md:text-xl text-white/90 mb-8 leading-relaxed text-center md:text-left">
          Learn simple ways to feel stronger and tackle common mental health
          stuff in your MindSpace.
        </p>

        {/* Added a call to action container in case you add buttons later */}
        <div className="flex justify-center md:justify-start">
          {/* Your Button Component here */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
