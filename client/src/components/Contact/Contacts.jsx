import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdArrowForwardIos } from "react-icons/md";
import { contactAPI } from "../../service/client"; // adjust path if needed

function Contacts() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // React Query mutation
  const { mutate, isLoading, isSuccess, isError, error } = useMutation({
    mutationFn: contactAPI.submitMessage,
    onSuccess: () => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    mutate(formData);
  };

  return (
    <div className="my-10 flex flex-col lg:flex-row gap-6">
      {/* Contact Form */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] lg:w-7/10 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            className="h-10 w-full border border-gray-200 rounded-lg pl-3 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            className="h-10 w-full border border-gray-200 rounded-lg pl-3 focus:ring-2 focus:ring-blue-500 outline-none"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            className="h-10 w-full border border-gray-200 rounded-lg pl-3 focus:ring-2 focus:ring-blue-500 outline-none"
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <textarea
            className="w-full h-32 border border-gray-200 rounded-lg pl-3 pt-2 focus:ring-2 focus:ring-blue-500 outline-none"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="bg-gray-50 w-40 text-black rounded-lg py-3 px-8 font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? "Sending..." : "Submit"}
          </button>

          {/* Feedback */}
          {isSuccess && (
            <p className="text-green-600 text-sm">
              Message sent successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600 text-sm">
              {error?.response?.data?.message || "Something went wrong"}
            </p>
          )}
        </form>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col h-full transition-transform duration-300 ease-in-out transform hover:scale-[1.02] lg:w-3/10 w-full">
        <h1 className="text-2xl font-semibold mb-4">Get In Touch</h1>
        <p className="mb-6 text-gray-700">
          Ready to prioritize your well-being? Contact our dedicated team today
          to learn more about how we can support you.
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
          <div className="inline-flex items-center space-x-2 cursor-pointer hover:text-blue-600">
            <MdArrowForwardIos />
            <p>More Info</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
