import React from "react";
import ForumCard from "./ForumCard";
import CustomButton from "../ui/CustomButton";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { forumAPI } from "../../service/client";
import { useState } from "react";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";

const ForumGrid = () => {
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  };
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
  if (error) {
    if (error.response?.status === 401) {
      navigate("/Register", { state: { from: window.location.pathname } });
      return null;
    }
  }
  const forums = forum?.data;

  console.log("forum list", forums);
  if (forums.length == 0) return <p>no forum found</p>;

  return (
    <section className="bg-azure-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Community Forum
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {forums.map((forum) => (
            <ForumCard
              key={forum._id}
              title={forum.header}
              description={forum.subHeader}
              content={forum.list}
              id={forum._id}
            />
          ))}
        </div>

        <div className="flex mt-10 px-15">
          <Link to="/community">
            <CustomButton
              color="#132440"
              borderRadius="10px"
              width="250px"
              padding="10px 20px"
              onClick={scrollToTop}
            >
              See More Forum
            </CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ForumGrid;
