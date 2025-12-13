import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

function Contacts() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="my-10 flex flex-col lg:flex-row gap-6">
      
      {/* Contact Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] lg:w-7/10 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            className="h-10 w-full border border-gray-200 rounded-lg pl-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            className="h-10 w-full border border-gray-200 rounded-lg pl-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <input
            className="h-10 w-full border border-gray-200 rounded-lg pl-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            type="text"
            name="subject"
            placeholder="Subject"
            required
          />
          <textarea
            className="w-full h-32 border border-gray-200 rounded-lg pl-3 pt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            name="message"
            placeholder="Your Message"
            required
          ></textarea>

          <button
            className="bg-gray-50 w-40 text-black rounded-lg py-3 px-8 font-semibold text-base cursor-pointer transition-all duration-300 hover:scale-105 "
            type="submit"
          >
            submit
          </button>
        </form>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] lg:w-3/10 w-full">
        <h1 className="text-2xl font-semibold mb-4">Get In Touch</h1>
        <p className="mb-6 text-gray-700">
          Ready to prioritize your well-being? Contact our dedicated team today to learn more about how we can support you. We're here to help you take the next step.
        </p>

        <div className="flex flex-col space-y-4 text-gray-700">
          <div className="inline-flex items-center space-x-2">
            <FaPhoneAlt className="text-blue-500" />
            <p>09 12 34 56 78</p>
          </div>
          <div className="inline-flex items-center space-x-2">
            <FaEnvelope className="text-blue-500" />
            <p>birdsfalkdl@afoid.c0m</p>
          </div>
          <div className="inline-flex items-center space-x-2">
            <IoLocation className="text-blue-500" />
            <p>8465 megenagn</p>
          </div>
          <div className="inline-flex items-center space-x-2 cursor-pointer transition-colors duration-300 hover:text-blue-600">
            <MdArrowForwardIos className="text-lg" />
            <p>More Info</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Contacts;
