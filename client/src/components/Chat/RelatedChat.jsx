import React from "react";
import { Link } from "react-router-dom";

function RelatedChat() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <div>
      <div className="my-3 cursor-pointer rounded-md shadow-sm transition duration-300 transform hover:scale-105">
        <div className="bg-[#E0FFFF] p-4">
          <Link to={``} onClick={scrollToTop}>
            <h1 className="text-lg font-semibold text-gray-800 mb-1">
              Discussion about Stress
            </h1>
          </Link>
          <p className="text-sm text-gray-600">
            Stress is your body's natural response to demands or pressure. It's
            a feeling of being overwhelmed or unable to cope with mental or
            emotional strain. While short bursts of stress can sometimes be
            helpful,
          </p>
        </div>
      </div>
      <div className="my-3 cursor-pointer rounded-md shadow-sm transition duration-300 transform hover:scale-105">
        <div className="bg-[#E0FFFF] p-4">
          <Link to={``} onClick={scrollToTop}>
            <h1 className="text-lg font-semibold text-gray-800 mb-1">
              Discussion about Accadamic pressure
            </h1>
          </Link>
          <p className="text-sm text-gray-600">
            Academic pressure refers to the stress and anxiety experienced by
            students due to the demands of their academic pursuits. This
            pressure can arise from various sources, including high expectations
            from parents
          </p>
        </div>
      </div>
    </div>
  );
}

export default RelatedChat;
