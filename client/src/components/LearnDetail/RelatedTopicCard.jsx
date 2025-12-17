import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { articleAPI } from "../../service/client";
import Spinner from "../ui/Spinner";

function RelatedTopicsList() {
  const [page, setPage] = React.useState(1);
  const limit = 5;

  const query = { page, limit, sort: "header" };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["articles", "related", page],
    queryFn: () => articleAPI.getArticleByType({ articleType: "related", ...query }),
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return <p className="text-red-500 text-center mt-10">Failed to load related articles.</p>;

  const articlesArray = data?.data || [];
  if (!articlesArray.length)
    return <p className="text-center mt-10 text-gray-500">No related articles found.</p>;

  return (
    <div className="flex flex-col justify-between">
      {/* Article Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {articlesArray.map((article) => (
          <div
            key={article._id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col transition hover:shadow-md hover:scale-105 duration-300"
          >
            <h3 className="text-xl font-semibold mb-4 text-center">{article.header}</h3>
            <p className="text-gray-600 text-base flex-grow mb-6 text-center">
              {article.list?.length > 150
                ? `${article.list.substring(0, 150)}...`
                : article.list}
            </p>
            <div className="mt-auto flex justify-center">
              <Link to={`/learn/${article._id}`}>
                <button className="bg-gray-100 text-black rounded-full py-2 px-6 font-semibold hover:bg-gray-200 transition">
                  Read More
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-auto gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 font-semibold">{page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
          disabled={articlesArray.length < limit}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default RelatedTopicsList;
