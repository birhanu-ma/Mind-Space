import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { forumAPI } from "../../service/client";
import Spinner from "../ui/Spinner";

const RecommendedPosts = () => {
  // Query params: fetch the latest 5 discussions
  const query = { page: 1, limit: 5, sort: "createdAt" };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["forums", query],
    queryFn: async () => {
      return await forumAPI.getAllForums(query);
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (isError)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load discussions.
      </p>
    );

  const forums = data || [];
  if (!forums.length)
    return <p className="text-center mt-10 text-gray-500">No discussions found.</p>;

  return (
    <section className="bg-white ml-10">
      {forums.map((forum) => (
        <Link key={forum._id} to={`/forum/${forum._id}`} className="block my-3">
          <div className="cursor-pointer rounded-md shadow-sm transition hover:scale-105">
            <div className="bg-[#E0FFFF] p-4">
              <h1 className="text-lg font-semibold">{forum.header}</h1>
              <p className="text-sm text-gray-600">
                {forum.list.length > 100
                  ? `${forum.list.substring(0, 100)}...`
                  : forum.list}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default RecommendedPosts;
