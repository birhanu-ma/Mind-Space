import React from "react";
import { Link } from "react-router-dom";

function ProfessionCard({ name, profession, description, profileImage }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <Link to={``} onClick={scrollToTop}>
      <div className="mx-2 my-4 flex flex-col justify-center h-auto cursor-pointer">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm transition-transform duration-300">
          
          <img
            src={profileImage}
            alt={name}
            className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
          />

          <h3 className="text-xl text-center font-semibold mb-2 text-gray-900">
            {name}
          </h3>
          <p className="text-center text-gray-700 font-medium mb-2">
            {profession}
          </p>
          <p className="text-center text-gray-600 text-sm">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProfessionCard;
