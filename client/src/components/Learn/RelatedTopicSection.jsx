import React, { useState } from "react";
import TopicCard from "./TopicCard";
import { articleAPI } from "../../service/client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const RelatedTopicsSection = () => {
  const [articleType] = useState("main");
  const [query] = useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 3,
  });

  const {
    data: article,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["article", "related", articleType, query],
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

  if (isLoading) return null;

  if (error) return null;

  const articles = article?.data || [];
  if (articles.length === 0) return null;

  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-8 bg-purple-600" />
            <span className="text-purple-600 font-bold uppercase tracking-[0.2em] text-xs">
              Continue Reading
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
            Learn related topics
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {articles.map((topi) => (
            <motion.div
              key={topi._id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="group"
            >
              <div className="relative h-full transition-transform duration-500 group-hover:-translate-y-2">
                <TopicCard
                  id={topi._id}
                  title={topi.header}
                  description={topi.list}
                  className="h-full bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.02)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedTopicsSection;
