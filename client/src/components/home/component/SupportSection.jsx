import React from "react";
import PhoneMockup from "./PhoneMockup";
import { Link } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";
import { motion } from "framer-motion";

const SupportSection = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="w-full bg-[#FDFDFD] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-16 md:gap-24">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-600 text-xs font-bold uppercase tracking-widest">
              Built for students
            </span>
          </motion.div>

          <motion.h2 
            variants={fadeUp}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8"
          >
            The Most Supportive <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Wellness Platform.
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-xl"
          >
            MindSpace combines psychology and technology to support students
            facing stress, anxiety, and burnout. Whether it's exam pressure or
            emotional fatigue, we provide a safe, stigma-free space to
            reflect, connect, and heal.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/apply-for-mentee">
              <CustomButton
                color="#0F172A"
                borderRadius="50px"
                onClick={scrollToTop}
                className="px-10 py-4 shadow-xl hover:shadow-purple-200/50 transition-all font-bold text-lg"
              >
                Get Counselor
              </CustomButton>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative flex justify-center items-center"
        >
          <div className="absolute w-[80%] h-[80%] bg-purple-200/30 rounded-full blur-[100px] -z-10" />
          
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="w-full max-w-[320px] md:max-w-md drop-shadow-[0_35px_35px_rgba(0,0,0,0.1)]"
          >
            <PhoneMockup />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default SupportSection;