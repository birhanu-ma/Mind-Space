import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForumCard = ({ title, description, content }) => {
  const [isHovered, setIsHovered] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  return (
    <div
      className={`bg-white rounded-xl p-8 flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] border border-gray-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 className="text-2xl font-semibold mb-4 text-gray-900 text-center md:text-left">
        {title}
      </h3>
      <p className="text-gray-700 text-base mb-4 text-center md:text-left">
        {description}
      </p>
      {content && (
        <p className="text-gray-700 text-base mb-6 text-center md:text-left">
          {content}
        </p>
      )}

      <div className="flex justify-center md:justify-end">
        <Link to={`1`} onClick={scrollToTop}>
          <button className="bg-gray-50 text-black  rounded-lg py-3 px-8 font-semibold text-base cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg">
            Get Involved
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ForumCard;
