import React, { useState } from "react";
import ArticleTable from "../../features/Article/articleTable.jsx";
import { useQuery } from "@tanstack/react-query";
import { articleAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import { NavLink } from "react-router-dom";

export default function Article() {
  const [articleType, setArticleType] = useState("main");
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState({
    sort: "header",
    page: 1,
    limit: 10,
  });

  const { data: articleData, isLoading, error } = useQuery({
    queryKey: ["article", articleType, searchQuery, query],
    queryFn: async () => {
      if (articleType === "All") {
        return await articleAPI.getAllArticle({ q: searchQuery, ...query });
      } else {
        return await articleAPI.getArticleByType({ articleType, q: searchQuery, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load articles.
      </p>
    );

  const articles = articleData?.data || [];
  const results = articleData?.results || 0;
  const totalPages = Math.ceil(results / query.limit);

  return (
    <div className="flex flex-col w-full bg-background text-foreground border border-border rounded-lg px-5 py-5">
      {/* Header + Search + Filter */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-foreground">Article Management</h2>

        <div className="flex gap-2 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search by header"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setQuery((prev) => ({ ...prev, page: 1 }));
            }}
            className="border rounded-md p-2 w-[200px]"
          />

          <label className="text-sm font-medium flex items-center gap-2">
            Filter by Type:
            <select
              value={articleType}
              onChange={(e) => {
                setArticleType(e.target.value);
                setQuery((prev) => ({ ...prev, page: 1 }));
              }}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="main">main</option>
              <option value="related">related</option>
            </select>
          </label>
        </div>
      </div>

      {/* Table */}
      <ArticleTable
        articles={articles}
      />

      {/* Footer: Add Article + Pagination Inline */}
      <div className="flex justify-between items-center mt-4 flex-wrap gap-2 text-sm text-muted-foreground">
        <NavLink
          to="/admin/articles/new"
          className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
        >
          Add Article
        </NavLink>

        {results > 0 && (
          <div className="flex items-center gap-3">
            <span>
              Showing {(query.page - 1) * query.limit + 1}–
              {Math.min(query.page * query.limit, results)} of {results}
            </span>

            <button
              disabled={query.page <= 1}
              onClick={() => setQuery((prev) => ({ ...prev, page: prev.page - 1 }))}
              className="p-1 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {query.page} of {totalPages}
            </span>

            <button
              disabled={query.page >= totalPages}
              onClick={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
              className="p-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
