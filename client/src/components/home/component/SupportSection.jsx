import React from "react";
import PhoneMockup from "./PhoneMockup";
import { Link } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";

const SupportSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  return (
    <section className="w-full bg-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Left Text Content */}
        <div className="flex flex-col">
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            The Most Supportive Mental Wellness Platform for youth
          </h1>
          <p className="text-lg md:text-xl text-gray-700">
            MindSpace combines psychology and technology to support students
            facing stress, anxiety, and burnout. Whether it's exam pressure or
            emotional fatigue, MindSpace provides a safe, stigma-free space to
            reflect, connect, and heal.
          </p>
        </div>
        <Link to="/apply-for-mentee" className="py-10 flex justify-start">
          <CustomButton
            color="#1F2937"
            borderRadius="12px"
            onClick={scrollToTop}
          >
            Get Counselor
          </CustomButton>
        </Link>
        </div>

        {/* Right Phone Mockup */}
        <div className="w-full md:w-1/2 flex justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
