import React from "react";
import { Link } from "react-router-dom";

const CreateForum = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
  return (
    <section className="bg-azure-50 py-16">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl shadow-md max-w-6xl mx-auto p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">
              What is on your mind?
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto">
              Let's connect, brainstorm together, and see what everyone has to share.
              Your input and perspectives are valuable!
            </p>
          </div>

          <div className="flex justify-center">
            <Link to= "/newforum"
            onClick={scrollToTop}
            >
            <button className="bg-black text-white cursor-pointer text-xl font-semibold py-3 px-10 rounded-full hover:bg-gray-800 transition-colors duration-300">
              Create Forum
            </button>
            </Link>
            
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateForum;
