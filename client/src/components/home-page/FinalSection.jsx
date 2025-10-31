import React from "react";
import img4 from "../../assets/Homepage/img4.jpg"; 
import { Link } from "react-router-dom";

const FinalSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <section
      className="relative h-[400px] md:h-[500px] bg-cover bg-center mt-6 flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${img4})` }}
    >
      {/* Pink Transparent Overlay */}
      <div className="absolute inset-0 bg-blue-400 bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl">
          Because Mental Health Should Be as Accessible as Lecture Notes
        </h2>
        <Link to ="/aboutus"
        onClick={scrollToTop}
        >
        <button className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold transition duration-300">
          More about our impact
        </button>
        </Link>
       
      </div>
    </section>
  );
};

export default FinalSection;
