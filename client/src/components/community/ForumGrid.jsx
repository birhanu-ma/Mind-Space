import React from "react";
import ForumCard from "./ForumCard";
import CustomButton from "../ui/CustomButton";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { forumAPI } from "../../service/client";
import { useState } from "react";
import Spinner from "../ui/Spinner";

 // const forumData = [
  //   {
  //     id: 1,
  //     title: "Discussion about stress....",
  //     description:
  //       "For me, stress often feels like this constant underlying pressure, a mental juggling act where I'm trying to keep too many balls in the air – deadlines, responsibilities, personal stuff. Sometimes it manifests physically",
  //   },
  //   {
  //     id: 2,
  //     title: "Discussion about Anxiety....",
  //     description:
  //       "I'm trying to keep too many balls in the air – deadlines, responsibilities, personal stuff. Sometimes it manifests physically",
  //   },
  //   {
  //     id: 3,
  //     title: "Discussion about depression....",
  //     description:
  //       "What about you? What does stress feel like for you, and what are some of the common things that trigger it in your life? It could be anything from work or school pressures to relationship issues or even just the everyday hustle and bustle",
  //   },
  //   {
  //     id: 4,
  //     title: "Discussion about accadamic pressure....",
  //     description:
  //       "So, what's been going on with you lately? Anything interesting, challenging, exciting, or even just a little bit different from the usual? It",
  //   },
  //   {
  //     id: 5,
  //     title: "Discussion about financial stress....",
  //     description:
  //       "So, what's been going on with you lately? Anything interesting, challenging, exciting, or even just a little bit different from the usual? Itm has been the industry",
  //   },
  //   {
  //     id: 6,
  //     title: "Discussion about stress....",
  //     description:
  //       "So, what's been going on with you lately? Anything interesting, challenging, exciting, or even just a little bit different from the usual? It",
  //   },
  // ];


const ForumGrid = () => {
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
    if (error)
      return (
        <p className="text-red-500 text-center mt-10">Failed to load forums.</p>
      );
    const forums = forum?.data;
  
    console.log("forum list", forums);
    if (forums.length == 0) return <p>no forum found</p>;
  // Sample forum data
 
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
            />
          ))}
        </div>

        <div className="flex mt-10 justify-center">
          <Link to="/#">
            <CustomButton
              color="#132440"
              borderRadius="10px"
              width="300px"
              padding="20px 30px"
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
