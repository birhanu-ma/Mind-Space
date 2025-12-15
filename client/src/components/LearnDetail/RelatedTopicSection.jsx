// RelatedTopicsSection.jsx
import React from "react";
import RelatedTopicCard from "./RelatedTopicCard";
const RelatedTopicsSection = () => {
  return (
    <section className="py-20">
        <h2 className="text-3xl font-semibold mb-12">Learn related topics</h2>

          <RelatedTopicCard />
    </section>
  );
};

export default RelatedTopicsSection;
