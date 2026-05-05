import React from "react";
import { FaComments, FaTools, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const InfoSection = () => {
  const features = [
    {
      icon: <FaComments size={28} />,
      title: "Safe Sharing",
      description: "Share experiences in a safe, anonymous space with a supportive community.",
      accent: "from-blue-400 to-cyan-400",
    },
    {
      icon: <FaTools size={28} />,
      title: "Wellbeing Tools",
      description: "Benefit from practical wellbeing tools and evidence-based mental health resources.",
      accent: "from-purple-400 to-indigo-400",
    },
    {
      icon: <FaClock size={28} />,
      title: "24/7 Access",
      description: "Gain access in minutes. Our platform is available all day, every day, whenever you need it.",
      accent: "from-emerald-400 to-teal-400",
    },
  ];

  // Professional Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
    },
  };

  return (
    <section className="bg-white flex items-center min-h-screen py-24 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Whatever's on your mind, <br className="hidden sm:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
              we're here.
            </span>
          </h2>
          <div className="h-1.5 w-20 bg-purple-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group relative bg-white border border-gray-100 p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.07)] transition-all duration-500"
            >
              <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br ${feature.accent} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 rounded-[2.5rem]`} />

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.accent} blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                  <div className="relative w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900 group-hover:bg-white group-hover:shadow-xl transition-all duration-300">
                    <span className="text-purple-600">{feature.icon}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-500 text-lg leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default InfoSection;