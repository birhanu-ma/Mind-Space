
import React from 'react';

import ValueCard from './ValueCard';
import valueData from './ValueData';

function Value() {


  return (
    <section className='shadow-lg bg-[#FAF7F0] '>
     
      <div className="flex flex-col sm:flex-row justify-around items-center p-5">
        {valueData.map((value) => (
          <ValueCard key={value.id} icon={value.icon} title={value.title} description={value.description} />
        ))}
      </div>
    </section>
  );
}

export default Value;