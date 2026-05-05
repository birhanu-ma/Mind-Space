import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const FinalSection = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    const isAuthenticated = !!localStorage.getItem("id");
    if (isAuthenticated) {
      navigate("/apply-for-profession");
    } else {
      navigate("/Register", { state: { from: "/apply-for-profession" } });
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="relative overflow-hidden bg-white min-h-screen flex items-center px-6 py-24 text-center">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-50 rounded-full blur-[120px] opacity-50 z-0" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <span className="px-5 py-2 rounded-full bg-gray-900 text-white text-xs font-bold uppercase tracking-[0.2em]">
              Join Our Mission
            </span>
          </motion.div>

          <motion.h2 
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-[1.1] tracking-tighter"
          >
            Because Mental Health Should Be <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              Accessible to Everyone.
            </span>
          </motion.h2>

          <motion.p 
            variants={fadeUp}
            className="text-gray-500 text-lg sm:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            We provide tools, guidance, and support so that everyone can take care
            of their mental wellbeing anytime, anywhere. Join us as a professional today.
          </motion.p>

          <motion.div variants={fadeUp} className="flex justify-center">
            <motion.button
              onClick={handleApplyClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 shadow-2xl hover:bg-purple-600 transition-all duration-300"
            >
              Apply for Profession
              <HiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-300 text-sm font-medium tracking-widest uppercase">
        MindSpace © 2026
      </div>
    </section>
  );
};

export default FinalSection;