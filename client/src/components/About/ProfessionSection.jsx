
import React from 'react';
import ProfessionHeader from './ProfessionHeader';
import ProfessionCard from './ProfessionCard';
import professionData from './ProfessionData';

function ProfessionSection() {
  const headerTitle = 'Our Mental Health Professionals';
  const headerDescription =
    "Dedicated experts in mental health and psychology, our professionals provide skilled support and guidance. Grounded in these disciplines, they deliver comprehensive and evidence-based care. Specializing in fostering well-being, our team offers insightful and effective support to those seeking to prioritize their mental health.";

  return (
    <section className='py-16 px-4 md:px-8'>
        <div className="max-w-7xl mx-auto">

      
      <ProfessionHeader title={headerTitle} description={headerDescription} />
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionData.map((profession) => (
          <ProfessionCard
            key={profession.id}
            name={profession.name}
            description={profession.description}
            imageUrl={profession.imageUrl}
          />
        ))}
      </div>
      </div>
    </section>
  );
}

export default ProfessionSection;