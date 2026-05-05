import React from "react";
import { motion } from "framer-motion";
import { HiArrowLongRight } from "react-icons/hi2";

const Hero = () => {
  const heroImage =
    "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <section className="relative h-screen w-full flex items-center overflow-hidden bg-gray-100">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.5 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImage}
          alt="Atmospheric MindSpace background"
          className="w-full h-full object-cover object-center mix-blend-multiply"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-100/40 to-transparent"></div>

        <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
      </div>

      <div className="relative z-10 w-full px-6 sm:px-12 lg:px-24 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-gray-900/5 border border-gray-900/10 backdrop-blur-md text-gray-900 text-xs font-bold uppercase tracking-[0.2em]"
          >
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            Discover Clarity
          </motion.div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-gray-900 leading-[1.1] tracking-tighter mb-8">
            Want to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-500">
              Know More?
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-gray-600 max-w-xl mb-12 leading-relaxed font-light">
            Learn simple ways to feel stronger and tackle common mental health
            stuff in your MindSpace. We bridge the gap between where you are and
            where you want to be.
          </p>

          {/* <div className="flex flex-col sm:flex-row gap-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-5 bg-gray-900 text-white rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:bg-purple-700"
            >
              Start Your Journey
              <HiArrowLongRight className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ x: 5 }}
              className="px-10 py-5 text-gray-900 font-semibold flex items-center justify-center gap-3 border border-gray-900/20 rounded-full hover:bg-gray-900/5 transition-all"
            >
              Watch Story
            </motion.button>
          </div> */}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent" />
    </section>
  );
};

export default Hero;
