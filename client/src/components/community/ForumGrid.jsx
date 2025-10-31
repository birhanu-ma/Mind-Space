import React from "react";
import ForumCard from "./ForumCard";

const ForumGrid = () => {
  // Sample forum data
  const forumData = [
    {
      id: 1,
      title: "Discussion about stress....",
      description:
        "For me, stress often feels like this constant underlying pressure, a mental juggling act where I'm trying to keep too many balls in the air – deadlines, responsibilities, personal stuff. Sometimes it manifests physically",
    },
    {
      id: 2,
      title: "Discussion about Anxiety....",
      description:
        "I'm trying to keep too many balls in the air – deadlines, responsibilities, personal stuff. Sometimes it manifests physically",
    },
    {
      id: 3,
      title: "Discussion about depression....",
      description:
        "What about you? What does stress feel like for you, and what are some of the common things that trigger it in your life? It could be anything from work or school pressures to relationship issues or even just the everyday hustle and bustle",
    },
    {
      id: 4,
      title: "Discussion about accadamic pressure....",
      description:
        "So, what's been going on with you lately? Anything interesting, challenging, exciting, or even just a little bit different from the usual? It",
    },
    {
      id: 5,
      title: "Discussion about financial stress....",
      description:
        "So, what's been going on with you lately? Anything interesting, challenging, exciting, or even just a little bit different from the usual? Itm has been the industry",
    },
    {
      id: 6,
      title: "Discussion about stress....",
      description:
        "So, what's been going on with you lately? Anything interesting, challenging, exciting, or even just a little bit different from the usual? It",
    },
  ];

  return (
    <section className="bg-azure-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">Community Forum</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {forumData.map((forum) => (
            <ForumCard key={forum.id} title={forum.title} description={forum.description} />
          ))}
        </div>

        <div className="flex mt-10 justify-center">
          <button className="bg-black text-white cursor-pointer text-xl font-semibold py-3 px-10 rounded-full hover:bg-gray-800 transition-colors duration-300">
            See More Forum
          </button>
        </div>
      </div>
    </section>
  );
};

export default ForumGrid;
