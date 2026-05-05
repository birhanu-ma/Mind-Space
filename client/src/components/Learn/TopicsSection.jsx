import React from "react";
import TopicCard from "./TopicCard";
import { useQuery } from "@tanstack/react-query";
import { articleAPI } from "../../service/client";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TopicsSection = () => {
  const navigate = useNavigate();
  const [articleType, setArticleType] = React.useState("main");
  const [query] = React.useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 10,
  });

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", articleType, query],
    queryFn: async () => {
      if (articleType === "All") {
        return await articleAPI.getAllArticle(query);
      } else {
        return await articleAPI.getArticleByType({ articleType, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (error) {
    if (error.response?.status === 401) {
      navigate("/Register", { state: { from: window.location.pathname } });
      return null;
    }
    return (
      <div className="py-20 text-center">
        <p className="text-red-500 font-medium">Something went wrong. Please try again later.</p>
      </div>
    );
  }

  const articles = article?.data;

  return (
    <section className="bg-[#FDFDFD] py-24 px-6 md:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
        >
          <div className="max-w-2xl">
            <span className="text-purple-600 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
              Knowledge Base
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight">
              Explore Mental <br /> Health Topics
            </h2>
          </div>
          
          <div className="flex gap-3">
             {["main", "All"].map((type) => (
               <button
                 key={type}
                 onClick={() => setArticleType(type)}
                 className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                   articleType === type 
                   ? "bg-gray-900 text-white shadow-lg" 
                   : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                 }`}
               >
                 {type.charAt(0).toUpperCase() + type.slice(1)}
               </button>
             ))}
          </div>
        </motion.div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-100 animate-pulse rounded-[2.5rem]" />
              ))}
            </motion.div>
          ) : !articles || articles.length === 0 ? (
            <p className="text-center py-20 text-gray-400 text-lg">No topics found at this moment.</p>
          ) : (
            <motion.div 
              key="grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {articles.map((topic) => (
                <motion.div
                  key={topic._id}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
                  }}
                  whileHover={{ y: -12 }}
                  className="relative group"
                >
                  <TopicCard
                    id={topic._id}
                    title={topic.header}
                    description={topic.list}
                    className="h-full bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] group-hover:border-purple-100 transition-all duration-500"
                  />
                  
                  {/* Subtle Accent Glow */}
                  <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-100 to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500 rounded-[2.5rem]" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TopicsSection;