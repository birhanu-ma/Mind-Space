import React from 'react';
import img1 from '../../assets/Homepage/img1.png'; // Replace with your actual image path
import img2 from '../../assets/Homepage/img2.png';
import img3 from '../../assets/Homepage/img3.png';
import { Link } from 'react-router-dom';

const InfoSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <section className="bg-white ml-10  pt-16  px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        Whatever's on your mind, we're here.
      </h2>

      {/* 3-column grid */}
      <div className="grid gap-8  sm:grid-cols-2 lg:grid-cols-3">
        {/* First Column */}
        <div className="space-y-4">
          <img src={img1} alt="Share experiences" className="w-26 h-25 cursor-pointer" />
          <p className="text-gray-800 font-medium  text-xl">
            Share experiences in a safe, anonymous space.
          </p>
          <Link to= "/aboutus"
          onClick={scrollToTop}
          >
          <button className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-full">
            Explore MindSpace
          </button>
          </Link>
          
        </div>

        {/* Second Column */}
        <div className="space-y-4">
          <img src={img2} alt="Wellbeing tools" className="w-26 h-25 cursor-pointer" />
          <p className="text-gray-700 text-base font-medium  text-xl">
            Benefit from practical wellbeing tools and resources.
          </p>
        </div>

        {/* Third Column */}
        <div className="space-y-4">
          <img src={img3} alt="24/7 Access" className="w-26 h-25 cursor-pointer" />
          <p className="text-gray-700 text-base font-medium  text-xl">
            Gain access in minutes, available all day, every day.
          </p>
        </div>
      </div>
    </section>
  );
};

export default InfoSection;