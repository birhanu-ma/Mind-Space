import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../ui/CustomButton";

const CreateForum = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl p-10 md:p-16 border border-gray-200 transition-transform duration-300 hover:scale-[1.02]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What’s on your mind?
            </h2>
            <p className="text-gray-700 text-lg md:text-xl max-w-3xl mx-auto">
              Let's connect, brainstorm, and see what everyone has to share.
              Your input and perspectives are valuable!
            </p>
          </div>

          {/* <div className="flex justify-center">
            <Link to="/newform" onClick={scrollToTop}>
              <CustomButton
                color="#000000"
                borderRadius="12px"
                width="300px"
                padding="16px 30px"
              >
                Create Forum
              </CustomButton>
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default CreateForum;
