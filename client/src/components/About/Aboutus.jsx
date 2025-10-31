// components/AboutUs.js
import React from 'react';
import AboutUsCard from './AboutUsCard';
import aboutUsData from './AboutUsData';

function AboutUs() {
  return (
    <section className='bg-[#FAF7F0]'>
      {aboutUsData.map((item) => (
        <AboutUsCard key={item.id} header={item.header} paragraph={item.paragraph} />
      ))}
    </section>
  );
}

export default AboutUs;