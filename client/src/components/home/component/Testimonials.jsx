import React, { useState } from "react";
import stars from "../../../assets/Homepage/Star1.png";
import quotation from "../../../assets/Homepage/quotation.svg";
import rightArrow from "../../../assets/Homepage/right.png";
import leftArrow from "../../../assets/Homepage/left.png";

const testimonialsData = [
  {
    text: "I have a very busy brain and can find it hard to unwind. Now a daily practice is actually so wonderful and healing for me.",
    author: "John from Chicago",
  },
  {
    text: "Mindspace has changed my life in immeasurable ways. I am more resilient and feel so much more connected to myself.",
    author: "Jasmine from Bend",
  },
  {
    text: "Using MindSpace daily has brought so much clarity and peace into my life. It's a real game changer!",
    author: "Amina from Nairobi",
  },
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 2) % testimonialsData.length);
  };

  const handlePrev = () => {
    setStartIndex(
      (prevIndex) =>
        (prevIndex - 2 + testimonialsData.length) % testimonialsData.length,
    );
  };

  const visibleTestimonials = [
    testimonialsData[startIndex],
    testimonialsData[(startIndex + 1) % testimonialsData.length],
  ];

  return (
    <section className="bg-gray-50 min-h-screen  flex items-center py-20">
      <div>
        <h2 className="text-3xl sm:text-4xl font-semibold text-gray-800 text-center mb-16">
          What our users say about MindSpace
        </h2>

        <div className="container mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-8 border border-gray-200 flex flex-col h-full transition-transform duration-300 hover:translate-y-1"
              >
                <img
                  src={quotation}
                  alt="Quotation mark"
                  className="w-10 h-10 mb-6"
                />
                <p className="text-gray-800 italic text-lg md:text-xl mb-6 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-gray-900 font-semibold mb-3">
                  {testimonial.author}
                </p>
                <img src={stars} alt="5-star rating" className="w-24" />
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-end mt-8 space-x-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full cursor-pointer bg-white border border-gray-200 hover:bg-gray-100 transition"
            >
              <img src={leftArrow} alt="Previous" className="w-8 h-8" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full cursor-pointer bg-white border border-gray-200 hover:bg-gray-100 transition"
            >
              <img src={rightArrow} alt="Next" className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
