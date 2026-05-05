import React from "react";
import { motion } from "framer-motion"; 
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-top"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        }}
      >
        <div className="absolute inset-0 bg-gray-900/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-gray-900/60" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-6 inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-[0.2em]"
          >
            Your Journey Starts Here
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.4,
              }}
              className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter"
            >
              Mental Health <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-emerald-200">
                Matters.
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-lg"
          >
            <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed border-l-2 border-blue-400 pl-6">
              Supporting your journey to wellness with professional resources
              and compassionate care. Explore a space designed for your peace of
              mind.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{
          opacity: { delay: 1.5 },
          y: { repeat: Infinity, duration: 2 },
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/40"
      >
        <ChevronDown size={32} strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default Hero;
