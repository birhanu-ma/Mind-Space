import React, { useState } from "react";
import ArticleTable from "../../features/Article/articleTable.jsx";
import { useQuery } from "@tanstack/react-query";
import { articleAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function Article() {
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
    <div className="flex flex-col sm:flex-row w-full bg-background text-foreground border border-border rounded-lg">
      <div className="rounded-lg px-5 w-full">
        {/* article Filter */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter by Type:</label>
            <select
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="main">main</option>
              <option value="related">related</option>
            </select>
          </div>
        </div>
        <ArticleTable
          articles={articles}
          articleType={articleType}
          setArticleType={setArticleType}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
}

export default Article;
