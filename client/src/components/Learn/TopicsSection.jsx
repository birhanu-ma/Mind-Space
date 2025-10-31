import React, { useEffect, useState } from 'react';
import TopicCard from './TopicCard';


const TopicsSection = () => {
  const [articles, setArticles] = useState([]);
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/api/articles/")
    .then((res)=>res.json())
    .then((data)=>setArticles(data))
    .catch((error)=>console.erro(error));

  })
  


  return (
    <section className="bg-[#fff2f2] py-20">
      <div className="max-w-screen-xl mx-auto px-8">
        <h2 className="text-3xl font-semibold mb-12 text-black text-center">Learn more about different mental health topics</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((topi, index) => (
            <div
              key={topi.id}
              className="min-h-[360px] opacity-0 animate-fadeInUp"
              style={{ animationDelay: `${index * 0.1}s` }} 
            >
              <TopicCard id={topi.id} title={topi.title} description={topi.content} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;
