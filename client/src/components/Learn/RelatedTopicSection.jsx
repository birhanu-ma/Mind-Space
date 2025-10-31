import React,{useState, useEffect} from 'react';
import TopicCard from './TopicCard';

// const relatedTopicsData = [
//   {
//     id: 1,
//     topic: "Social Isolation and Loneliness",
//     description: "Social Isolation and Loneliness are related but distinct concepts that describe different aspects of limited social connections and their impacts on mental health."
//   },
//   {
//     id: 2,
//     topic: "Time Management",
//     description: "Time management refers to the ability to plan and control how you spend the hours in your day to accomplish specific activities and optimize productivity and well-being."
//   },
//   {
//     id: 3,
//     topic: "Trauma and PTSD",
//     description: "Trauma refers to deeply distressing or disturbing experiences that overwhelm an individual's ability to cope, while PTSD is a specific condition that can develop after trauma."
//   },
//   {
//     id: 4,
//     topic: "Financial Stress",
//     description: "Financial stress refers to the worry, anxiety, and emotional strain caused by one's current or anticipated financial situation, affecting mental and physical health."
//   },
//   {
//     id: 5,
//     topic: "Fear of Failure",
//     description: "Fear of failure is a pervasive anxiety related to the potential negative consequences of not succeeding at a task or goal, which can lead to avoidance behaviors."
//   },
//   {
//     id: 6,
//     topic: "Peer Pressure",
//     description: "Peer pressure refers to the social influence exerted by one's peers to adopt certain behaviors, values, or attitudes, regardless of whether they align with one's own beliefs."
//   }
// ];

const RelatedTopicsSection = () => {

    const [articles, setArticles] = useState([]);
    useEffect(()=>{
      fetch("http://127.0.0.1:8000/api/articles/")
      .then((res)=>res.json())
      .then((data)=>setArticles(data))
      .catch((error)=>console.erro(error));
  
    })
    
  return (
    <section className="bg-white py-20">
      <div className="max-w-screen-xl mx-auto px-8">
        <h2 className="font-poppins text-3xl font-semibold mb-12 text-black">Learn related topics</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(6,12).map((topi, index) => (
            <div 
              key={topi.id} 
              className="min-h-[360px] fadeInRight" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TopicCard 
              id = {topi.id}
                title={topi. title} 
                description={topi.content}
                variant="secondary"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTopicsSection;
