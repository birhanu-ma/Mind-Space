import React, { useEffect, useState } from "react";
import TopicCard from "./TopicCard";
import { useQuery } from "@tanstack/react-query";
import { articleAPI } from "../../service/client";
import Spinner from "../ui/Spinner";

// const articles = [
//   {
//     id: 1,
//     topic: "Social Isolation and Loneliness",
//     description:
//       "Social Isolation and Loneliness are related but distinct concepts that describe different aspects of limited social connections and their impacts on mental health.",
//   },
//   {
//     id: 2,
//     topic: "Time Management",
//     description:
//       "Time management refers to the ability to plan and control how you spend the hours in your day to accomplish specific activities and optimize productivity and well-being.",
//   },
//   {
//     id: 3,
//     topic: "Trauma and PTSD",
//     description:
//       "Trauma refers to deeply distressing or disturbing experiences that overwhelm an individual's ability to cope, while PTSD is a specific condition that can develop after trauma.",
//   },
//   {
//     id: 4,
//     topic: "Financial Stress",
//     description:
//       "Financial stress refers to the worry, anxiety, and emotional strain caused by one's current or anticipated financial situation, affecting mental and physical health.",
//   },
//   {
//     id: 5,
//     topic: "Fear of Failure",
//     description:
//       "Fear of failure is a pervasive anxiety related to the potential negative consequences of not succeeding at a task or goal, which can lead to avoidance behaviors.",
//   },
//   {
//     id: 6,
//     topic: "Peer Pressure",
//     description:
//       "Peer pressure refers to the social influence exerted by one's peers to adopt certain behaviors, values, or attitudes, regardless of whether they align with one's own beliefs.",
//   },
// ];

const TopicsSection = () => {
  const [articleType, setArticleType] = useState("main");
  const [query, setQuery] = useState({
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

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load articles.</p>
    );
  const articles = article?.data;

  console.log("article list", articles);
  if (articles.length == 0) return <p>no article found</p>;

  return (
    <section className="bg-[#fff2f2] py-20">
      <div className="max-w-screen-xl mx-auto px-8">
        <h2 className="text-3xl font-semibold mb-12 text-black text-center">
          Learn more about different mental health topics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((topi, index) => (
            <div
              key={topi._id}
              className="min-h-[360px] opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TopicCard
                id={topi._id}
                title={topi.header}
                description={topi.list}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
