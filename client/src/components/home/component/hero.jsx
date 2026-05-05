import React from "react";
import image1 from "../../../assets/Homepage/image1.jpg";
import image2 from "../../../assets/Homepage/image2.png";
import { Link } from "react-router-dom";
import CustomButton from "../../ui/CustomButton";
import { motion } from "framer-motion";

const Hero = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "instant" });
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
    <section className="relative overflow-hidden min-h-screen bg-[#FDFDFD] flex items-center justify-center py-20">
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[500px] h-[500px] bg-purple-50 rounded-full blur-3xl opacity-60" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[500px] h-[500px] bg-blue-50 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 grid lg:grid-cols-2 gap-16 items-center relative z-10">
        
        {/* Text Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8 text-center lg:text-left"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-600 text-xs font-bold uppercase tracking-[0.2em]">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            Your Mental Wellness Partner
          </motion.div>

          <motion.h1 
            variants={fadeUp}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 leading-[1.1] tracking-tight"
          >
            Your Safe Space <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-purple-600">
              for Well-Being.
            </span>
          </motion.h1>

          <motion.p 
            variants={fadeUp}
            className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
          >
            MindSpace helps you manage stress, connect with peers, and access
            professional support safely and anonymously.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link to="/support">
              <CustomButton
                color="#0F172A" 
                borderRadius="50px" 
                onClick={scrollToTop}
                className="px-10 py-4 shadow-xl hover:shadow-purple-200/50 transition-all"
              >
                Find Support Now
              </CustomButton>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <div className="relative z-10 w-full aspect-[4/5] max-w-[450px] mx-auto group">
            <motion.div 
               whileHover={{ y: -10 }}
               transition={{ type: "spring", stiffness: 300 }}
               className="w-full h-full rounded-[2rem] overflow-hidden shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] border-8 border-white"
            >
              <img
                src={image1}
                alt="Mental Wellness 1"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="absolute -bottom-10 -left-10 sm:-left-20 w-1/2 aspect-square rounded-[1.5rem] overflow-hidden border-8 border-white shadow-2xl z-20"
            >
              <img
                src={image2}
                alt="Mental Wellness 2"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;