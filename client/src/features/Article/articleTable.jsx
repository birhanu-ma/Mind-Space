import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Badge } from "../../components/ui/badge.jsx";
export default function ArticleTable({ articles = [], query, setQuery }) {
  const [searchTerm, setSearchTerm] = useState(query.q || "");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery((prev) => ({ ...prev, q: searchTerm, page: 1 }));
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="flex flex-col  w-full bg-background px-5">
      <div className="w-full flex flex-col gap-5">
        <Card className="bg-background text-foreground border border-border rounded-xl">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            {/* Controls */}
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              {/* Search */}
              <Input
                placeholder="Search by header"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px]"
              />

              {/* Sort */}
              <select
                value={query.sort}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    sort: e.target.value,
                    page: 1,
                  }))
                }
                className="w-[120px] p-2 border rounded"
              >
                <option value="main">main</option>
                <option value="related">related</option>
              </select>
            </div>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              {articles.length === 0 ? (
                <div className="py-10 text-center text-gray-500">
                  No articles found.
                </div>
              ) : (
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-foreground/20">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Header
                      </th>

                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Sub-header
                      </th>

                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        articleType
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {articles.map((article) => (
                      <tr
                        key={article._id}
                        className="border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 text-left px-4 text-sm font-medium">
                          {article.header}
                        </td>
                        <td className="py-4 text-left px-4 text-sm">
                          {article.subHeader}
                        </td>

                        <td className="py-4 px-4 text-sm">
                          <Badge
                            className={`capitalize ${
                              article.articleType === "main"
                                ? "bg-blue-100 text-blue-600"
                                : article.articleType === "related"
                            }`}
                          >
                            {article.articleType}
                          </Badge>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <NavLink
                            to={`/article-detail/${article._id}`}
                            className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                          >
                            View Details
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {articles.results > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>
                  Showing {(query.page - 1) * query.limit + 1}–
                  {Math.min(query.page * query.limit, articles.results)} of{" "}
                  {articles.results}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={query.page <= 1}
                    onClick={() =>
                      setQuery((prev) => ({ ...prev, page: prev.page - 1 }))
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span>Page {query.page}</span>
                  <button
                    disabled={articles.length < query.limit}
                    onClick={() =>
                      setQuery((prev) => ({ ...prev, page: prev.page + 1 }))
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <NavLink to="/admin/articles/new">

        <button className="p-2 bg-blue-500 rounded-lg w-50 my-4 cursor-pointer">
          Add Article
        </button>
      </NavLink>
    </div>
  );
}
