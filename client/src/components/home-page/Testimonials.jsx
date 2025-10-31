import React, { useState } from "react";
import stars from '../../assets/Homepage/star1.png';
import quotation from '../../assets/Homepage/quotation.svg';
import rightArrow from '../../assets/Homepage/right.png';
import leftArrow from '../../assets/Homepage/left.png';

const testimonialsData = [
  {
    text: "I have a very busy brain and can find it hard to unwind. Now a daily practice is actually so wonderful and healing for me.",
    author: "John from Chicago"
  },
  {
    text: "Mindspace has changed my life in immeasurable ways. I am more resilient and feel so much more connected to myself.",
    author: "Jasmine from Bend"
  },
  {
    text: "Using MindSpace daily has brought so much clarity and peace into my life. It's a real game changer!",
    author: "Amina from Nairobi"
  }
];

const Testimonials = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    setStartIndex((prevIndex) =>
      (prevIndex + 2) % testimonialsData.length
    );
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) =>
      (prevIndex - 2 + testimonialsData.length) % testimonialsData.length
    );
  };


  const visibleTestimonials = [
    testimonialsData[startIndex],
    testimonialsData[(startIndex + 1) % testimonialsData.length]
  ];

  return (
    <section className="  bg-gray-50">
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
        What our users say about MindSpace
      </h1>
      <div className="container mx-auto px-4 sm:px-10">
        <div className="grid md:grid-cols-2 gap-10">
          {visibleTestimonials.map((testimonial, index) => (
            <div key={index} className="bg-blue-500 p-8 rounded-xl shadow-lg text-white">
              <div className="flex flex-col">
                <img src={quotation} alt="Quotation mark" className="w-10 h-10 mb-6" />
                <p className="mb-6 text-lg md:text-xl italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-lg font-semibold mb-4">{testimonial.author}</p>
                <img src={stars} alt="5-star rating" className="w-24 mb-2" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8 space-x-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full cursor-pointer bg-white shadow-md hover:bg-gray-100 transition"
          >
            <img src={leftArrow} alt="Previous" className="w-8 h-8" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full cursor-pointer bg-white shadow-md hover:bg-gray-100 transition"
          >
            <img src={rightArrow} alt="Next" className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
