import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import stars from "../../../assets/Homepage/Star1.png";
import quotation from "../../../assets/Homepage/quotation.svg";
import { HiArrowLongLeft, HiArrowLongRight } from "react-icons/hi2"; // More professional icons

const testimonialsData = [
  {
    text: "I have a very busy brain and can find it hard to unwind. Now a daily practice is actually so wonderful and healing for me.",
    author: "John from Chicago",
    role: "Daily Practitioner"
  },
  {
    text: "Mindspace has changed my life in immeasurable ways. I am more resilient and feel so much more connected to myself.",
    author: "Jasmine from Bend",
    role: "Community Member"
  },
  {
    text: "Using MindSpace daily has brought so much clarity and peace into my life. It's a real game changer!",
    author: "Amina from Nairobi",
    role: "Student"
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const visibleItems = [
    testimonialsData[index],
    testimonialsData[(index + 1) % testimonialsData.length],
  ];

  return (
    <section className="bg-[#FDFDFD] min-h-screen flex items-center py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 w-full">
        
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl text-left">
            <span className="text-purple-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
              Real Experiences
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
              What our users say <br /> about MindSpace
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 group"
            >
              <HiArrowLongLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-900 hover:text-white transition-all duration-300 group"
            >
              <HiArrowLongRight size={24} />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {visibleItems.map((testimonial, i) => (
              <motion.div
                key={`${index}-${i}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                className="bg-white rounded-[2.5rem] p-10 md:p-14 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative group"
              >
                <img
                  src={quotation}
                  alt="Quotation"
                  className="w-12 h-12 mb-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500"
                />

                <p className="text-gray-700 text-xl md:text-2xl font-light leading-relaxed mb-10 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center justify-between mt-auto pt-8 border-t border-gray-50">
                  <div>
                    <h4 className="text-gray-900 font-bold text-lg">{testimonial.author}</h4>
                    <p className="text-purple-600 text-sm font-medium">{testimonial.role}</p>
                  </div>
                  <img src={stars} alt="Rating" className="w-24 grayscale group-hover:grayscale-0 transition-all duration-500" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-12 gap-2 lg:hidden">
            {testimonialsData.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all duration-300 ${index === i ? 'w-8 bg-purple-600' : 'w-2 bg-gray-200'}`}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;