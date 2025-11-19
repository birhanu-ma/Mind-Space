
import React from 'react';
import ProfessionHeader from '../component/ui/ProfessionHeader';
import ProfessionCard from '../component/ui/ProfessionCard';
import { professionalAPI } from '../../../service/client';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../ui/Spinner';

function ProfessionSection() {
  const headerTitle = 'Our Mental Health Professionals';
  const headerDescription =
    "Dedicated experts in mental health and psychology, our professionals provide skilled support and guidance. Grounded in these disciplines, they deliver comprehensive and evidence-based care. Specializing in fostering well-being, our team offers insightful and effective support to those seeking to prioritize their mental health.";
      const [profession, setProfession] = useState("therapist");
      const [query, setQuery] = useState({
        q: "",
        sort: "header",
        page: 1,
        limit: 10,
      });
      const {
        data: professional,
        isLoading,
        error,
      } = useQuery({
        queryKey: ["profession", profession, query],
        queryFn: async () => {
          if (profession === "All") {
            return await professionalAPI.getAllProfessionals(query);
          } else {
            return await professionalAPI.getProfessionalsByType({ profession, ...query });
          }
        },
        keepPreviousData: true,
        retry: false,
      });
    
      if (isLoading) return <Spinner />;
      if (error)
        return (
          <p className="text-red-500 text-center mt-10">Failed to load professions.</p>
        );
      const professionData = professional?.data;
    
      console.log("profession list", professionData);
      if (professionData.length == 0) return <p>no profession found</p>;

  return (
    <section className='py-16 px-4 md:px-8'>
        <div className="max-w-7xl mx-auto">

      
      <ProfessionHeader title={headerTitle} description={headerDescription} />
      <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {professionData.map((professions) => (
          <ProfessionCard
            profileImage={professions.profileImage}
            key={professions._id}
            name={professions.user}
            profession={professions.profession}
            description={professions.aboutYou}
         
          />
        ))}
      </div>
      </div>
    </section>
  );
}

export default ProfessionSection;