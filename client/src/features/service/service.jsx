import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { serviceAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import ServiceTable from "./serviceTabel.jsx";
import { NavLink } from "react-router-dom";

function Service() {
  const [serviceType, setServiceType] = useState("internal");
  const [query, setQuery] = useState({
    q: "",
    sort: "header",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useQuery({
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
      <p className="text-red-500 text-center mt-10">Failed to load services.</p>
    );

  const services = data?.data || [];
  const results = data?.results || 0;
  const totalPages = Math.ceil(results / query.limit);

  return (
    <div className="flex flex-col w-full bg-background text-foreground border border-border rounded-lg px-5 py-5">
      {/* Header + Search + Filter */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        {/* Parent Header */}
        <h2 className="text-2xl font-bold text-foreground">Service Management</h2>

        <div className="flex gap-2 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search by header"
            value={query.q}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))
            }
            className="border rounded-md p-2 w-[200px]"
          />

          <label className="text-sm font-medium flex items-center gap-2">
            Filter by Type:
            <select
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value);
                setQuery((prev) => ({ ...prev, page: 1 }));
              }}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="All">All</option>
              <option value="internal">Internal</option>
              <option value="external">External</option>
            </select>
          </label>
        </div>
      </div>

      {/* Table */}
      <ServiceTable services={services} />

      {/* Footer: Add Service + Pagination Inline */}
      <div className="flex justify-between items-center mt-4 flex-wrap gap-2 text-sm text-muted-foreground">
        <NavLink
          to="/admin/services/new"
          className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600"
        >
          Add Service
        </NavLink>

        {results > 0 && (
          <div className="flex items-center gap-3">
            <span>
              Showing {(query.page - 1) * query.limit + 1}–
              {Math.min(query.page * query.limit, results)} of {results}
            </span>

            <button
              disabled={query.page <= 1}
              onClick={() => setQuery((prev) => ({ ...prev, page: prev.page - 1 }))}
              className="p-1 disabled:opacity-50"
            >
              Previous
            </button>

            <span>
              Page {query.page} of {totalPages}
            </span>

            <button
              disabled={query.page >= totalPages}
              onClick={() => setQuery((prev) => ({ ...prev, page: query.page + 1 }))}
              className="p-1 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Service;
