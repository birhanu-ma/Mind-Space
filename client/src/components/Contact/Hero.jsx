import React from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone } from "lucide-react";

const Image = "https://images.unsplash.com/photo-1742844019094-cefa1969b331?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={Image}
          alt="Contact Background"
          className="w-full h-full object-cover brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-blue-400 font-bold uppercase tracking-[0.4em] text-xs mb-4"
        >
          Get In Touch
        </motion.span>

        <div className="overflow-hidden">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter mb-8"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-emerald-200">Us.</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="text-gray-300 text-lg md:text-xl font-light max-w-lg leading-relaxed"
        >
          Have a question or just want to talk? Our team is here to support you 24/7.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="flex gap-8 mt-12 text-white/60"
        >
          <div className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors cursor-pointer">
            <Mail size={18} className="text-blue-400" />
            <span>hello@mindspace.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium hover:text-white transition-colors cursor-pointer">
            <Phone size={18} className="text-emerald-400" />
            <span>+1 (555) 000-0000</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 to-transparent z-20" />
    </section>
  );
}

export default Hero;