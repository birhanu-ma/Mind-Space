import React from 'react';
import { Link } from 'react-router-dom';

const TopicCard = ({ id, title, description, variant = 'primary' }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  return (
    <div
      className={`bg-white rounded-xl p-8 flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] border ${
        variant === 'secondary' ? 'bg-[#fff2f2] border-transparent' : 'border-gray-200'
      }`}
    >
      <h3 className="font-poppins text-xl font-semibold mb-4 text-gray-900 text-center">
        {title}
      </h3>
      <p className="font-inter text-base font-light leading-relaxed flex-grow mb-6 text-gray-700 text-center">
        {description.length > 150 ? `${description.substring(0, 150)}...` : description}
      </p>
      <Link to={`/learn/${id}`} onClick={scrollToTop} className="flex justify-center">
        <button className="self-center bg-gray-50 text-black rounded-full py-3 px-8 font-poppins font-semibold text-base cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
          Read More
        </button>
      </Link>
    </div>
  );
};

export default TopicCard;
