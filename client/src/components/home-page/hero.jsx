import React from 'react';
import image1 from '../../assets/Homepage/image1.jpg';
import image2 from '../../assets/Homepage/image2.png';
import { Link } from 'react-router-dom'; 

const Hero = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section className="bg-blue-200  px-4 sm:px-8 py-12 md:py-40 flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
      
     
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6 lg:ml-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
          Your Safe Space for <br className="hidden sm:block" /> Mental Well-Being
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
          MindSpace is here to help you manage stress, connect with peers, and
          access professional support — anonymously and safely.
        </p>
        <Link to='/support'
        onClick={scrollToTop}>
        <button className="bg-purple-400 cursor-pointer hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-full transition duration-300 transform hover:scale-105">
          Find Support
        </button>
        </Link>
      
      </div>

      <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-between items-center mt-8 md:mt-10 lg:mt-0">
        <div className="relative w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96">
          <img
            src={image1}
            alt="Mental Wellness 1"
            className="w-full h-full object-cover rounded-lg shadow-lg z-0 transform rotate-[-8deg] sm:rotate-[-12deg] lg:rotate-[-15deg]"
          />
          <img
            src={image2}
            alt="Mental Wellness 2"
            className="w-2/5 sm:w-3/5 h-3/5 md:h-3/5 object-cover rounded-lg shadow-md absolute right-0 sm:right-4 md:right-8 lg:-right-28 -bottom-4 sm:bottom-0 md:bottom-4 lg:bottom-20 z-0"
          />
        </div>
      </div>

    </section>
  );
};

export default Hero;