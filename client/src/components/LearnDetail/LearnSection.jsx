import React, { useState, useEffect } from "react";
import Image from "../../assets/image/luiz-rogerio-nunes-gkJYH0FLtt0-unsplash.jpg";
import { useParams } from "react-router-dom";

function LearnSection() {
  const { id } = useParams();

  const [articles, setArticles] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="w-150 h-100 object-cover mt-18"
        src={Image}
        alt="image"
      />

      <div>
        {articles ? (
          <>
            <h1 className=" font-poppins text-xl font-semibold my-6 text-center">{articles.title}</h1>
            <p className="font-inter p-5 text-base font-light leading-relaxed flex-grow mb-8 text-center">{articles.content}</p>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

export default LearnSection;
