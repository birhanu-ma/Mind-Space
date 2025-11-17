import React, { useState } from "react";
import ServiceTable from "./forumTable.jsx";
import { useQuery } from "@tanstack/react-query";
import { serviceAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function Service() {
  const [serviceType, setServiceType] = useState("internal");
  const [query, setQuery] = useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 10,
  });
  const {
    data: service,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["service", serviceType, query],
    queryFn: async () => {
      if (serviceType === "All") {
        return await serviceAPI.getAllServices(query);
      } else {
        return await serviceAPI.getServicesByType({ serviceType, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-500 text-center mt-10">Failed to load Services.</p>
    );
  const Services = service?.data;
  

  console.log("service list", Services);
  if (Services.length == 0) return <p>no service found</p>;

  return (
    <div className="flex flex-col sm:flex-row w-full bg-background text-foreground border border-border rounded-lg">
      <div className="rounded-lg px-5 w-full">
        {/* service Filter */}
        <div className="flex justify-end mb-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter by Type:</label>
            <select
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="internal">internal</option>
              <option value="external">external</option>
            </select>
          </div>
        </div>
        <ServiceTable
          Services={Services}
          serviceType={serviceType}
          setServiceType={setServiceType}
          query={query}
          setQuery={setQuery}
        />
      </div>
    </div>
  );
}

export default Service;
