import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const imageUrl = "https://images.unsplash.com/photo-1619070284836-e850273d69ac?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900" />
      </motion.div>

      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 text-blue-400 font-bold tracking-[0.3em] text-xs uppercase mb-6"
          >
            <Sparkles size={16} />
            Our Identity
          </motion.div>

          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
              className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85]"
            >
              Beyond the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-300">
                Surface.
              </span>
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed mb-10">
              We are a collective of minds dedicated to redefining mental wellness 
              for the modern student. Our mission is to bridge the gap between 
              isolation and community.
            </p>

            {/* <motion.button
              whileHover={{ x: 10 }}
              className="flex items-center gap-3 text-white font-bold group border-b border-white/20 pb-2 transition-colors hover:border-blue-400"
            >
              Discover Our Story 
              <ArrowRight className="text-blue-400 group-hover:translate-x-1 transition-transform" />
            </motion.button> */}
          </motion.div>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute right-12 bottom-12 hidden lg:block"
      >
        <p className="text-white/20 text-sm font-light uppercase tracking-[1em] vertical-text transform rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Est. 2024 — MindSpace
        </p>
      </motion.div>
    </section>
  );
}

export default Hero;