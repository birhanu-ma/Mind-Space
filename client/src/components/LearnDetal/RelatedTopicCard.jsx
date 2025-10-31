import React from "react";
import { Link } from "react-router-dom";

function RelatedTopicCard({ id, title, description, variant = 'primary' }) {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <div>
      <div
        className={`bg-white rounded-lg p-8 shadow-md flex flex-col h-full transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-lg ${
          variant === "secondary" ? "bg-[#fff2f2]" : ""
        }`}
      >
        <h3 className="font-poppins text-xl font-semibold mb-6 text-center">
          {title}
        </h3>
        <p className="font-inter text-base font-light leading-relaxed flex-grow mb-8 text-center">
          {description.length > 150
            ? `${description.substring(0, 150)}...`
            : description}
        </p>
        <Link 
        to={`${id}`}
        onClick={scrollToTop}
        className="flex justify-center"
        >
          
        <button className="self-center bg-[#fff2f2] border-none rounded-full py-3 px-8 font-poppins font-semibold text-base cursor-pointer transition-all duration-300 ease-in-out transform hover:translate-y-1 hover:shadow-lg">
          Read More
        </button>
        </Link>
        
      </div>
    </div>
  );
}

export default RelatedTopicCard;
