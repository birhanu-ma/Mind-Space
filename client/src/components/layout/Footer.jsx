import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter, FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import newsletterImage from "../../assets/image/image.svg";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-gray-900 text-gray-200">
      {/* Newsletter Section */}
      {/* <div
        className="bg-cover bg-center py-16 px-4 flex flex-col items-center justify-center text-center"
        style={{
          backgroundImage: `url(${newsletterImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Subscribe to Get Updates
        </h2>
        <p className="mb-6 max-w-md text-gray-200">
          Don’t miss out! Subscribe now for special promotions and monthly
          updates.
        </p>
        <div className="flex w-full max-w-md">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-l-md border border-gray-300 focus:outline-none text-gray-900"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-r-md font-semibold transition">
            Subscribe
          </button>
        </div>
      </div> */}

      {/* Main Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-b border-gray-700">
        {/* Logo / Branding */}
        <div>
          <h3 className="text-lg font-bold mb-4">Mindspace</h3>
          <p className="text-gray-400">
            Find your calm and focus with Mindspace.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center gap-2">
              <FaLocationDot /> <span>123 Megenagna St, Addis Ababa</span>
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineLocalPostOffice /> <span>info@mindspace.com</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> <span>+251 911 223 344</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-white transition"
                onClick={scrollToTop}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="hover:text-white transition"
                onClick={scrollToTop}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/tool"
                className="hover:text-white transition"
                onClick={scrollToTop}
              >
                Tools
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-white transition"
                onClick={scrollToTop}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex space-x-4 text-xl">
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              <FaXTwitter />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              <FaYoutube />
            </a>
            <a
              href="#"
              className="hover:text-white transition-colors duration-300"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Mindspace. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
