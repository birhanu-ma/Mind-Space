// components/AboutUs.js
import React from "react";
import AboutUsCard from "../component/ui/AboutUsCard";
import aboutUsData from "../AboutUsData";

function AboutUs() {
  return (
    <section className="sm:mt-24 sm:h-screen">
      {aboutUsData.map((item) => (
        <AboutUsCard
          key={item.id}
          header={item.header}
          paragraph={item.paragraph}
        />
      ))}
    </section>
  );
}

export default AboutUs;
