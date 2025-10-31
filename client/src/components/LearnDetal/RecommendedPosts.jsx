import React from "react";
import { Link } from "react-router-dom";
const RecommendedPosts = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <section className="bg-white ml-10">
      <Link to={``} onClick={scrollToTop} className="flex justify-center">
        <div className="my-3 cursor-pointer rounded-md shadow-sm transition duration-300 transform hover:scale-105">
          <div className="bg-[#E0FFFF] p-4">
            <h1 className="text-lg font-semibold text-gray-800 mb-1">
              Discussion about Stress
            </h1>
            <p className="text-sm text-gray-600">
            overwhelmed or unable to cope with mental or emotional strain. While short bursts of stress can sometimes 
            </p>
          </div>
        </div>
      </Link>
      <Link to={``} onClick={scrollToTop} className="flex justify-center">
        <div className="my-3 cursor-pointer rounded-md shadow-sm transition duration-300 transform hover:scale-105">
          <div className="bg-[#E0FFFF] p-4">
            <h1 className="text-lg font-semibold text-gray-800 mb-1">
              Discussion about depression
            </h1>
            <p className="text-sm text-gray-600">
            Depression is a common and serious mood disorder that negatively affects how you feel, think, and act. It goes beyond            </p>
          </div>
        </div>
      </Link>
      <Link to={``} onClick={scrollToTop} className="flex justify-center">
        <div className="my-3 cursor-pointer rounded-md shadow-sm transition duration-300 transform hover:scale-105">
          <div className="bg-[#E0FFFF] p-4">
            <h1 className="text-lg font-semibold text-gray-800 mb-1">
              Discussion about Acadamic pressure
            </h1>
            <p className="text-sm text-gray-600">
            Academic pressure refers to the stress and anxiety experienced by students due to the demands of their academic pursuits.            </p>
          </div>
        </div>
      </Link>
    </section>
  );
};

export default RecommendedPosts;
