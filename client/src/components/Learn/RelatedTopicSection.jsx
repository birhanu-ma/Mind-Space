import React,{useState, useEffect} from 'react';
import TopicCard from './TopicCard';
import { articleAPI } from '../../service/client';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../ui/Spinner';


const RelatedTopicsSection = () => {
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
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-8">
        <h2 className="font-poppins text-3xl font-semibold mb-12 text-black">Learn related topics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((topi, index) => (
            
            <div 
              key={topi.id} 
              className="min-h-[360px] fadeInRight" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TopicCard 
                id = {topi._id}
                title={topi. header} 
                description={topi.list}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTopicsSection;
