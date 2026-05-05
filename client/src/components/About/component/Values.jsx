import React from 'react';
import { motion } from 'framer-motion';
import ValueCard from '../component/ui/ValueCard';
import valueData from '../ValueData';

function Value() {
  return (
    <section className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-4"
          >
            Our Core Values
          </motion.h2>
          <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
            The principles that guide our commitment to your mental wellbeing.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16"
        >
          {valueData.map((value) => (
            <ValueCard 
              key={value.id} 
              icon={value.icon} 
              title={value.title} 
              description={value.description} 
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Value;