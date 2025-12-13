import React from "react";
import TopicCard from "./TopicCard";
import { useQuery } from "@tanstack/react-query";
import { articleAPI } from "../../service/client";
import Spinner from "../ui/Spinner";

const TopicsSection = () => {
  const [articleType, setArticleType] = React.useState("main");
  const [query, setQuery] = React.useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 10,
  });

  const { data: article, isLoading, error } = useQuery({
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

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load articles.</p>
    );

  const articles = article?.data;
  if (!articles || articles.length === 0)
    return <p className="text-center mt-10 text-gray-500">No articles found.</p>;

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 text-center mb-12">
          Explore Mental Health Topics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((topic, index) => (
            <div
              key={topic._id}
              className="opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TopicCard
                id={topic._id}
                title={topic.header}
                description={topic.list}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
