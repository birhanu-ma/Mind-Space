import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  HeartPulse,
  Users2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

const OurServices = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 px-6 lg:px-12 bg-[#FDFDFD] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-gray-900 mb-6">
            Our Comprehensive Services
          </h2>
          <div className="w-24 h-1.5 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Image Section with Reveal Effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex-1 relative group"
          >
            <div className="absolute -inset-4 bg-blue-100/50 rounded-[2.5rem] -rotate-2 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.pexels.com/photos/3768917/pexels-photo-3768917.jpeg"
                alt="Mental health counseling office"
                className="w-full h-[400px] md:h-[550px] object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          </motion.div>

          {/* Content Section */}
          <div className="flex-1">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3
                variants={itemVariants}
                className="text-3xl md:text-4xl font-black mb-8 text-gray-900 tracking-tight"
              >
                Comprehensive Support for <br />
                <span className="text-blue-600">Youth Well-being</span>
              </motion.h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Column 1 */}
                <motion.div variants={itemVariants} className="space-y-6">
                  {[
                    {
                      title: "Mental Health Education",
                      icon: Sparkles,
                      color: "text-amber-500",
                    },
                    {
                      title: "Self-Care Toolkit",
                      icon: HeartPulse,
                      color: "text-rose-500",
                    },
                    {
                      title: "Peer Support Forums",
                      icon: Users2,
                      color: "text-blue-500",
                    },
                  ].map((service, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div
                        className={`mt-1 p-2 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all ${service.color}`}
                      >
                        <service.icon size={20} />
                      </div>
                      <p className="text-lg font-medium text-gray-700 leading-tight group-hover:text-gray-900 transition-colors">
                        {service.title}
                      </p>
                    </div>
                  ))}
                </motion.div>

                {/* Column 2 */}
                <motion.div variants={itemVariants} className="space-y-6">
                  {[
                    {
                      title: "Licensed Counselors",
                      icon: CheckCircle2,
                      color: "text-emerald-500",
                    },
                    {
                      title: "Crisis Resources",
                      icon: ShieldAlert,
                      color: "text-red-500",
                    },
                  ].map((service, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div
                        className={`mt-1 p-2 rounded-lg bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all ${service.color}`}
                      >
                        <service.icon size={20} />
                      </div>
                      <p className="text-lg font-medium text-gray-700 leading-tight group-hover:text-gray-900 transition-colors">
                        {service.title}
                      </p>
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurServices;
