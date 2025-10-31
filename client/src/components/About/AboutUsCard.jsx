// components/AboutUsCard.js
import React from 'react';

function AboutUsCard({ id, header, paragraph }) {
  return (
    <div key={id} className='grid sm:grid-cols-[1fr_3fr] itmes-center pt-10'>
      <h2 className="font-poppins flex items-center justify-center text-xl font-semibold mb-6">{header}</h2>
      <p className='p-5'>{paragraph}</p>
    </div>
  );
}

export default AboutUsCard;