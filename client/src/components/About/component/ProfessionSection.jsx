import React from "react";
import ProfessionHeader from "../component/ui/ProfessionHeader";
import ProfessionCard from "../component/ui/ProfessionCard";
import { professionalAPI } from "../../../service/client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";

function ProfessionSection() {
  const headerTitle = "Our Mental Health Professionals";
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
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profession", profession, query],
    queryFn: async () => {
      if (profession === "All") {
        return await professionalAPI.getAllProfessionals(query);
      } else {
        return await professionalAPI.getProfessionalsByType({
          profession,
          ...query,
        });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load professionals.
      </p>
    );

  // Adjust this based on your actual API response structure
  // Common patterns: response?.data?.data or response?.data
  const professionals = response?.data?.data || response?.data || [];

  console.log("professionals list", professionals);

  if (professionals.length === 0) {
    return <p className="text-center py-10">No professionals found</p>;
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <ProfessionHeader title={headerTitle} description={headerDescription} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {professionals.map((prof) => (
            <ProfessionCard
              key={prof._id}
              profileImage={prof.user?.photo || prof.profileImage || "default.jpg"} // fallback
              name={prof.user?.name || "Unknown Professional"} // ← FIX: use name string
              profession={prof.profession || "Mental Health Professional"}
              description={prof.aboutYou || "No description available."}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfessionSection;