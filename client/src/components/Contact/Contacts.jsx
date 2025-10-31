import React from "react";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";

function Contacts() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="my-10 flex flex-col sm:flex-row">
    <div className="bg-white shadow-md sm:w-[50%] rounded-lg p-6 transition-shadow duration-300 hover:shadow-xl">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          className="h-10 w-full border rounded pl-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          className="h-10 w-full border rounded pl-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />
        <input
          className="h-10 w-full border rounded pl-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          name="subject"
          type="text"
          placeholder="Subject"
          required
        />
        <textarea
          className="w-full h-32 border rounded pl-3 pt-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          name="message"
          placeholder="Your Message"
          required
        ></textarea>
  
        <button
          className="w-full h-10 cursor-pointer rounded-full bg-black text-white transition-colors duration-300 hover:bg-blue-600"
          type="submit"
        >
          Send Message
        </button>
      </form>
    </div>
  
    <div className="w-full flex flex-col px-10 sm:w-[50%] mt-6 sm:mt-0 mb-10 md:ml-10 sm:mx-10 transition-shadow duration-300 hover:shadow-xl">
      <h1 className="text-[clamp(1rem,5vw,3rem)]">Get In Touch</h1>
      <p className="mb-4">
      Ready to prioritize your well-being? Contact our dedicated team today to learn more about how we can support you. We're here to help you take the next step.
      </p>
      <div className="flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <span className="inline-flex items-center space-x-2 my-2">
              <h3 className="text-[clamp(1.3rem,2vw,2rem)]">get in touch</h3>
            </span>
            <span className="inline-flex items-center space-x-2 my-2">
              <FaPhoneAlt className="text-blue-500" />
              <p className="m-0">09 12 34 56 78</p>
            </span>
            <span className="inline-flex items-center space-x-2 my-2">
              <FaEnvelope className="text-blue-500" />
              <p className="m-0">birdsfalkdl@afoid.c0m</p>
            </span>
            <span className="inline-flex items-center space-x-2 my-2">
              <IoLocation className="text-blue-500" />
              <p className="m-0">8465 megenagn ,</p>
            </span>
          </div>
          <div className="flex flex-col">
            <span className="inline-flex items-center space-x-2 my-2">
              <h3 className="text-[clamp(1.3rem,2vw,2rem)]">get in touch</h3>
            </span>
            <span className="inline-flex items-center space-x-2 my-2">
              <FaPhoneAlt className="text-blue-500" />
              <p className="m-0">09 12 34 56 78</p>
            </span>
            <span className="inline-flex items-center space-x-2 my-2">
              <FaEnvelope className="text-blue-500" />
              <p className="m-0">birdsfalkdl@afoid.c0m</p>
            </span>
            <span className="inline-flex items-center space-x-2 my-2">
              <IoLocation className="text-blue-500" />
              <p className="m-0">8465 zegmesh ,</p>
            </span>
            <span className="inline-flex items-center space-x-2 my-2 cursor-pointer transition-colors duration-300 hover:text-blue-600">
              <MdArrowForwardIos className="text-lg" />
             
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Contacts;
