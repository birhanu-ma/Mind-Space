import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForumCard = ({ title, description }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <div
      className="bg-cyan-50 rounded-tr-[100px] rounded-bl-[100px] p-8 transition-all duration-300 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-700 mb-8">{description}</p>

      <div className="flex justify-center md:justify-end">
        <Link
        to={`1`}
        onClick={scrollToTop}
        >
        <button
          className={`
            bg-black text-white font-semibold cursor-pointer py-3 px-6 rounded-full 
            transform transition-all duration-300
            ${isHovered ? 'scale-105' : ''}
          `}
        >
          Get Involved
        </button>
        </Link>
       
      </div>
    </div>
  );
};

export default ForumCard;
