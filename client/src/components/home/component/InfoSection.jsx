import React from "react";
import { FaComments, FaTools, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";

const InfoSection = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  const features = [
    {
      icon: <FaComments size={50} className="text-blue-400" />,
      title: "Safe Sharing",
      description: "Share experiences in a safe, anonymous space.",
      link: "/register-as-mentee",
      buttonText: "Explore More",
    },
    {
      icon: <FaTools size={50} className="text-green-400" />,
      title: "Wellbeing Tools",
      description: "Benefit from practical wellbeing tools and resources.",
    },
    {
      icon: <FaClock size={50} className="text-purple-400" />,
      title: "24/7 Access",
      description: "Gain access in minutes, available all day, every day.",
    },
  ];

  return (
    <section className="bg-white flex items-center  min-h-screen pt-16 px-4 sm:px-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Whatever's on your mind, we're here.
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="space-y-4 flex flex-col items-center text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
