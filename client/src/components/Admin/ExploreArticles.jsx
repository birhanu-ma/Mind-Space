import React, { useState, useEffect } from "react";

function ExploreArticles({ setArticleClicked }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles/")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(error));
  }, []);
  console.log(articles);

  return (
    <div className="sm:absolute mt-5 sm:w-[50%] px-2 sm:max-h-[80vh] sm:overflow-y-auto shadow-sm sm:top-10 sm:right-0">
      {articles.map((article, index) => (
        <div
          
          key={index}
          onClick={() => {
            setArticleClicked(true);
            localStorage.setItem("articleId", article.id); // store clicked ID
          }}
          className=" cursor-pointer shadow-sm"
        >
          <h3 className="font-poppins text-xl font-semibold mb-6 text-center">
            {article.title}
          </h3>
          <p className="font-inter text-base font-light leading-relaxed flex-grow mb-8 text-center">
            {article.content.length > 150
              ? `${article.content.substring(0, 150)}...`
              : article.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default ExploreArticles;
