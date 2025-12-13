import React from "react";
import { Link } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";

const FinalSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section className="bg-blue-50 py-20 px-4 sm:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-snug">
          Because Mental Health Should Be Accessible to Everyone
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl mb-8">
          We provide tools, guidance, and support so that everyone can take care of their mental wellbeing—anytime, anywhere.
        </p>

       
        <Link to="/aboutus">
          <CustomButton
            color="#1F2937"
            borderRadius="12px"
            onClick={scrollToTop}
          >
            Explore More
          </CustomButton>
        </Link>
      </div>
    </section>
  );
};

export default FinalSection;
