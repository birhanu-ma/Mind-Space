import React from "react";
import image1 from "../../../assets/Homepage/image1.jpg";
import image2 from "../../../assets/Homepage/image2.png";
import { Link } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";

const Hero = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <section className="overflow-x-hidden bg-gray-50 px-4 sm:px-8 py-20 md:py-32 flex flex-col lg:flex-row items-center justify-between max-w-full">
      
      {/* Text Content */}
      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4 md:space-y-6 px-4 lg:px-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Your Safe Space for <br className="hidden sm:block" /> Mental Well-Being
        </h1>
        <p className="text-gray-700 text-base sm:text-lg max-w-md mx-auto lg:mx-0">
          MindSpace helps you manage stress, connect with peers, and access professional support — safely and anonymously.
        </p>

        <Link to="/support">
          <CustomButton
            color="#1F2937"
            borderRadius="12px"
            onClick={scrollToTop}
          >
            Find Support
          </CustomButton>
        </Link>
        <Link to="/apply-for-profession">
          <CustomButton
            color="#1F2937"
            borderRadius="12px"
            onClick={scrollToTop}
          >
            Apply for Profession
          </CustomButton>
        </Link>
        <Link to="/apply-for-mentee">
          <CustomButton
            color="#1F2937"
            borderRadius="12px"
            onClick={scrollToTop}
          >
            Get Counselor
          </CustomButton>
        </Link>
      </div>

      {/* Images */}
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-10 lg:mt-0 relative px-4">
        <div className="relative w-full max-w-md h-64 sm:h-80 md:h-96">
          <img
            src={image1}
            alt="Mental Wellness 1"
            className="w-full h-full object-cover rounded-xl shadow-sm transform -rotate-3 sm:-rotate-6"
          />
          <img
            src={image2}
            alt="Mental Wellness 2"
            className="w-2/5 sm:w-3/5 md:w-2/5 h-3/5 object-cover rounded-xl shadow-sm absolute right-0 bottom-0 sm:bottom-0 md:bottom-4 lg:bottom-8"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
