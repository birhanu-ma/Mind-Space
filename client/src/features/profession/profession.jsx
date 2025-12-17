import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { professionalAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import ProfessionTable from "./ProfessionTable.jsx";

export default function Profession() {
  const [profession, setProfession] = useState("therapist");
  const [query, setQuery] = useState({
    q: "",
    sort: "name",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useQuery({
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

  const professionals = data?.data || [];
  const results = data?.results || 0;

  return (
    <div className="flex flex-col w-full bg-background text-foreground border border-border rounded-lg px-5 py-5">
      <ProfessionTable
        professionals={professionals}
        query={query}
        setQuery={setQuery}
        total={results}
        profession={profession}
        setProfession={setProfession}
      />
    </div>
  );
}
