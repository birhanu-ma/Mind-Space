import React from 'react';
import { motion } from 'framer-motion';

function AboutUsCard({ id, header, paragraph }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      key={id}
      className="grid sm:grid-cols-[1fr_3fr] gap-4 md:gap-12 py-12 border-b border-gray-100 group"
    >
      <div className="relative">
        <motion.h2 
          className="font-sans text-2xl md:text-3xl font-black text-gray-900 leading-tight sticky top-24 transition-colors group-hover:text-blue-600"
        >
          {header}
        </motion.h2>
        
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "40px" }}
          className="h-1 bg-blue-500 mt-4 rounded-full hidden sm:block"
        />
      </div>

      <div className="relative">
        <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed p-0 sm:pl-10 border-l-0 sm:border-l border-gray-100 group-hover:border-blue-200 transition-colors duration-500">
          {paragraph}
        </p>
        
        <div className="absolute -inset-4 bg-blue-50/0 group-hover:bg-blue-50/30 rounded-2xl -z-10 transition-colors duration-500" />
      </div>
    </motion.div>
  );
}

export default AboutUsCard;