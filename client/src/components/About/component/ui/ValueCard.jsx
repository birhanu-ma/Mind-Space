import React from 'react';
import { motion } from 'framer-motion';

function ValueCard({ icon, title, description }) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="group relative flex flex-col items-center text-center p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-500"
    >
      {/* Decorative background element that appears on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

      {/* Icon Container with Glassmorphism */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-blue-100 blur-2xl rounded-full opacity-0 group-hover:opacity-40 transition-opacity" />
        <div className="relative w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
          {React.cloneElement(icon, { size: 32, strokeWidth: 1.5 })}
        </div>
      </div>

      {/* Text Content */}
      <div className="relative">
        <h3 className="text-xl font-black text-gray-900 mb-4 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-500 font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <motion.div 
        initial={{ width: 0 }}
        whileHover={{ width: "40%" }}
        className="h-1 bg-blue-500 mt-6 rounded-full opacity-50"
      />
    </motion.div>
  );
}

export default ValueCard;