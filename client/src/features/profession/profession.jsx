import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { professionalAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import ProfessionTable from "./professionTable.jsx";

function Profession() {
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
  const professions = professional?.data;

  console.log("profession list", professions);
  if (professions.length == 0) return <p>no profession found</p>;

  return (
    <div className="flex flex-col sm:flex-row w-full bg-background text-foreground border border-border rounded-lg">
      <div className="rounded-lg px-5 w-full">
        {/* profession Filter */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter by Type:</label>
            <select
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="therapist">therapist</option>
              <option value="psychology">psychology</option>
            </select>
          </div>
        </div>
        <ProfessionTable
          professions={professions}
          profession={profession}
          setProfession={setProfession}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
}

export default Profession;
