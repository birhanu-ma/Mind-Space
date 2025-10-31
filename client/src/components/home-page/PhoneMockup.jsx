import React from "react";
import img8 from '../../assets/Homepage/img8.png';     // "How can I help?"
import img7 from '../../assets/Homepage/img7.png';     // "How are you feeling?"
import img6 from '../../assets/Homepage/img6.webp';    // Help options
import img81 from '../../assets/Homepage/img8.webp';   // Phone background

const PhoneMockup = () => {
  return (
    <div className="relative w-full max-w-[300px] h-auto flex flex-col items-center justify-center text-center mx-auto scale-90 md:scale-100">
      
      {/* 1. Phone Background (base layer) */}
      <img
        src={img81}
        alt="Mockup of a phone with a blue screen"
        className="w-full z-0"
      />

      {/* 2. "How can I help?" bubble (first visible element) */}
      <img
        src={img8}
        alt='Chat notification "How can I help?"'
        className="absolute top-[55%] left-[14%] w-[70%] z-20"
      />

      {/* 3. Emotion Tags (second visible element) */}
      <div className="absolute bottom-[55%] left-0 right-0 flex flex-wrap justify-center gap-2 px-4 z-30">
        {[
          { text: "Happy", color: "bg-yellow-200 text-yellow-800" },
          { text: "Confident", color: "bg-yellow-200 text-yellow-800" },
          { text: "Proud", color: "bg-green-200 text-green-800" },
          { text: "Calm", color: "bg-green-200 text-green-800" },
          { text: "Stressed", color: "bg-red-200 text-red-800" },
          { text: "Angry", color: "bg-red-200 text-red-800" },
          { text: "Anxious", color: "bg-pink-200 text-pink-800" },
          { text: "Sad", color: "bg-pink-200 text-pink-800" },
        ].map((tag, index) => (
          <div
            key={index}
            className={`px-3 py-1 rounded-full text-xs font-medium ${tag.color}`}
          >
            {tag.text}
          </div>
        ))}
      </div>

      {/* 4. "How are you feeling?" bubble (third visible element) */}
      <img
        src={img7}
        alt='Chat notification "How are you feeling?"'
        className="absolute top-[5%] right-[15%] w-[65%] z-10"
      />

      {/* 5. Help Options (fourth visible element) */}
      <img
        src={img6}
        alt="Help options"
        className="absolute bottom-[10%] left-[8%] w-[100] z-40"
      />
    </div>
  );
};

export default PhoneMockup;