// LearAndSidebar.jsx
import React from "react";
import LearnDetails from "./LearnDetails";
import LearnSideBar from "./LearnSideBar";

function LearnAndSidebar() {
  return (
    <div className="flex flex-row gap-4">
      <div className="sm:w-[60%] w-full">
        <LearnDetails />
      </div>

      <div className="sm:w-[38%] sticky top-20 hidden sm:block h-screen">
        <h1 className="text-lg ml-10 font-semibold text-gray-800 mb-3">
          Recommended Posts
        </h1>
        <LearnSideBar />
      </div>
    </div>
  );
}

export default LearnAndSidebar;
