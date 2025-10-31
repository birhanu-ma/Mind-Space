import React from "react";
import img4 from "../../../assets/Homepage/img4.jpg";
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
    <section
      className="relative h-[400px] md:h-[500px] bg-cover bg-center mt-6 flex items-center justify-center text-center"
      style={{ backgroundImage: `url(${img4})` }}
    >
      {/* Pink Transparent Overlay */}
      <div className="absolute inset-0 bg-blue-400 bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-6 max-w-3xl">
          Because Mental Health Should Be as Accessible as Lecture Notes
        </h2>

        <Link to="/aboutus">
          <CustomButton
            color="#4300FF"
            borderRadius="10px"
            width="300px"
            padding="20px 30px"
            onClick={scrollToTop}
          >
            More about our empact
          </CustomButton>
        </Link>
      </div>
    </section>
  );
};

export default FinalSection;
