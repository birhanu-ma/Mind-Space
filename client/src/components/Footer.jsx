
import React from "react";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import newsletterImage from "../assets/image/image.svg";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineLocalPostOffice } from "react-icons/md";
import { FaPhone } from "react-icons/fa";


const Footer = () => {

 const scrollToTop = () => {
   window.scrollTo({
     top: 0,
     behavior: 'instant',
   });
 };

  return (
 
      
    <div className="bg-gray-800 mb-20">
      {/* Newsletter Section */}
      <div
        className=" bg-cover bg-center text-white py-16 px-4"
        style={{
          backgroundImage: `url(${newsletterImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "400px",
        }}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">
            Subscribe to get updates
          </h2>
          <p className="mb-6">
            Don't wanna miss something? Subscribe right now and get special
            promotion and monthly newsletter.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              placeholder="Type your email here"
              className="px-4 py-2 rounded-l-md border text-gray-900 bg-gray-100 border-gray-300 focus:outline-none"
            />
            <button className="bg-gray-800 hover:bg-gray-900 hover:cursor-pointer text-white px-6 py-2 rounded-r-md">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-white justify-between  pl-10 py-8 px-4">
        <div className=" container max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <p>
            Mindspace: Find Your Calm and Focus
            </p>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold mb-4">Contact Information</h3>
            <span className="my-2 flex flex-row items-center">
              <FaLocationDot />
              <p className="m-2">09522233</p>
            </span>
            <span className=" my-2 flex flex-row items-center">
              <MdOutlineLocalPostOffice />
              <p className="m-2">  zefmesh megenagna B-12 </p>
            </span>
            <span className="my-2 flex flex-row items-center">
              <FaPhone />
              <p className="m-2"> megenagna</p>
            </span>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Link</h3>
            <ul>
              <li className="mb-2">
                <Link to="/" className="hover:underline"
                   onClick={scrollToTop}
                   >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/aboutus" className="hover:underline"
                   onClick={scrollToTop}
                >
                  About Us
                </Link>
              </li>
              <li className="mb-2"
                 onClick={scrollToTop}
              >
                <Link to="/tool" className="hover:underline">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline"
                   onClick={scrollToTop}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex text-2xl space-x-4">
              <a href="#">
                <FaFacebookF className="hover:text-gray-600 mr-1 transition-all ease-in-out duration-300" />
              </a>
              <a href="#">
                <FaXTwitter className="hover:text-gray-600 mr-1 transition-all ease-in-out duration-300" />
              </a>
              <a href="#">
                <FaYoutube className="hover:text-gray-600 mr-1 transition-all ease-in-out duration-300" />
              </a>
              <a href="#">
                <FaInstagram className="hover:text-gray-600 mr-1 transition-all ease-in-out duration-300" />
              </a>
            </div>
          </div>
        </div>
        {/* Copyright Section */}
      </footer>
      <div className="text-center bg-gray-800 m-10 text-sm  text-gray-100 items-center">
        Copyright © All rights reserved (Website Developed & Managed by COMPANY
        NAME)
      </div>
    </div>
  )
}
export default Footer;
 
