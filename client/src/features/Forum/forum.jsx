import React, { useState } from "react";
import ForumTable from "./forumTable.jsx";
import { useQuery } from "@tanstack/react-query";
import { forumAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function Forum() {
  const [forumType, setForumType] = useState("mental");
  const [query, setQuery] = useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 10,
  });
  const {
    data: forum,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forum", forumType, query],
    queryFn: async () => {
      if (forumType === "All") {
        return await forumAPI.getAllForums(query);
      } else {
        return await forumAPI.getForumsByType({ forumType, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load forums.</p>
    );
  const forums = forum?.data;

  console.log("forum list", forums);
  if (forums.length == 0) return <p>no forum found</p>;

  return (
    <div className="flex flex-col sm:flex-row w-full bg-background text-foreground border border-border rounded-lg">
      <div className="rounded-lg px-5 w-full">
        {/* forum Filter */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter by Type:</label>
            <select
              value={forumType}
              onChange={(e) => setForumType(e.target.value)}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="mental">mental</option>
              <option value="motivation">motivation</option>
            </select>
          </div>
        </div>
        <ForumTable
          forums={forums}
          forumType={forumType}
          setForumType={setForumType}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
}

export default Forum;
