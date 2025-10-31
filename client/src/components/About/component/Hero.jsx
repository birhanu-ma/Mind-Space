import React from "react";
import { Link } from "react-router-dom";

const imageUrl = "https://images.unsplash.com/photo-1619070284836-e850273d69ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Hero() {
  return (
    <section className="h-screen w-full relative">
      <div
        className="absolute inset-0 bg-cover bg-center brightness-50"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <h1 className="text-4xl flex justify-center md:text-5xl text-white font-bold leading-tight mb-6 p-2 cursor-pointer">
          About us
        </h1>
        <div className="flex flex-row justify-center items-center">
          <Link to="/">
            <h1 className="text-4xl md:text-5xl text-white font-bold leading-tight mb-6 p-2 cursor-pointer">
              Home
            </h1>
          </Link>
          <Link to="/aboutus">
            <h1 className="text-4xl text-white  md:text-5xl font-bold leading-tight mb-6 p-2 cursor-pointer">
              About us
            </h1>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;