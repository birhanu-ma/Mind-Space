
import React from "react";
import {Link} from "react-router-dom"

function ProfessionCard({ name, description, imageUrl }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }

  
  return (
    <Link
    to={``}
    onClick={scrollToTop}
    >
      <div className="mx-1 flex flex-col justify-center h-80 cursor-pointer bg-[#FBF8F2]">
      <div className="bg-white h-full  rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:translate-y-[-4px]">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={name}
            className="w-40 h-40 rounded-full object-cover mx-auto mb-2"
          />
        )}
        <h3 className="text-xl text-center font-semibold mb-2">{name}</h3>
        <p className='  text-center  text-gray-600 mb-6"'>{description}</p>
      </div>
    </div>
    </Link>
  
  );
}

export default ProfessionCard;
