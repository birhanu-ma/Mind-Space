import React from "react";
import { useNavigate } from "react-router-dom";

const FinalSection = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Check if the user is logged in by looking for the ID
    // that your apiClient sets/removes
    const isAuthenticated = !!localStorage.getItem("id");

    if (isAuthenticated) {
      navigate("/apply-for-profession");
    } else {
      // Redirect to register and save the intended destination
      navigate("/Register", { state: { from: "/apply-for-profession" } });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };

  return (
    <section className="bg-blue-50 py-20 min-h-screen flex items-center px-4 sm:px-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-6 leading-snug">
          Because Mental Health Should Be Accessible to Everyone
        </h2>
        <p className="text-gray-700 text-lg sm:text-xl mb-8">
          We provide tools, guidance, and support so that everyone can take care
          of their mental wellbeing anytime, anywhere.
        </p>

        {/* Replaced Link with a button and maintained your exact styles */}
        <button
          onClick={handleApplyClick}
          className="bg-black p-2 rounded-md text-white cursor-pointer"
        >
          Apply for Profession
        </button>
      </div>
    </section>
  );
};

export default FinalSection;
