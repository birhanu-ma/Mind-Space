
import React from 'react';

function ProfessionHeader({ title, description }) {
  return (
    <div className='w-[80%]'>
      <h2 className="text-3xl font-semibold text-center mb-12">{title}</h2>
      <p className=' w-300 p-5 mb-10 text-center mb-20'>{description}</p>
    </div>
  );
}

export default ProfessionHeader;