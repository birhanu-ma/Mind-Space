import React, { useState } from "react";
import ApplicationItem from "./ApplicationItem";
import { useQuery } from "@tanstack/react-query";
import { counselorAPI } from "../../../service/client";
import Spinner from "../../../components/ui/Spinner";

function ApplicationList() {
  const [query, setQuery] = useState({
    q: "",
    status: "all",
    sort: "name",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["applications", query],
    queryFn: () => counselorAPI.getAllApplications(query),
    keepPreviousData: true,
  });

  const applicationsData = data?.data || { data: [], results: 0 };
  const applications = applicationsData.data || [];
  const results = applicationsData.results || 0;
  const totalPages = Math.ceil(results / query.limit);

  const handlePrevPage = () => {
    if (query.page > 1) setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleNextPage = () => {
    if (query.page < totalPages) setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const countByStatus = (status) =>
    applications.filter((a) => a.status === status).length;

  if (isLoading) return <Spinner />;
  if (error)
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <p>Failed to load applications</p>
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Mentor Applications
        </h1>
        <p className="text-gray-600">Review and manage mentor applications</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-yellow-600">
            {countByStatus("pending")}
          </div>
          <div className="text-sm text-gray-600">Pending Applications</div>
        </div>
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">
            {countByStatus("approved")}
          </div>
          <div className="text-sm text-gray-600">Approved Applications</div>
        </div>
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-red-600">
            {countByStatus("rejected")}
          </div>
          <div className="text-sm text-gray-600">Rejected Applications</div>
        </div>
      </div>

      {/* Search, Filter, Sort */}
      <div className="flex flex-wrap gap-2 justify-between mb-4">
        <input
          type="text"
          placeholder="Search by applicant name"
          value={query.q}
          onChange={(e) => setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))}
          className="w-[200px] p-2 border rounded"
        />

        <select
          value={query.status}
          onChange={(e) => setQuery((prev) => ({ ...prev, status: e.target.value, page: 1 }))}
          className="p-2 border rounded"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={query.sort}
          onChange={(e) => setQuery((prev) => ({ ...prev, sort: e.target.value, page: 1 }))}
          className="p-2 border rounded"
        >
          <option value="name">Sort by Name</option>
          <option value="profession">Sort by Profession</option>
        </select>
      </div>

      {/* Applications Table */}
      <div className="bg-background rounded-lg overflow-hidden border border-border">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center px-6 py-3 bg-background text-foreground font-medium uppercase tracking-wider">
            <div className="w-1/6">Applicant</div>
            <div className="w-1/4">Profession</div>
            <div className="w-1/4">Experience (Years)</div>
            <div className="w-1/6 text-right">Status</div>
            <div className="w-1/6 text-right">Action</div>
          </li>
          {applications.map((item) => (
            <ApplicationItem item={item} key={item._id} />
          ))}
        </ul>
      </div>

      {/* Pagination */}
      {results > 0 && (
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            disabled={query.page <= 1}
            onClick={handlePrevPage}
            className="p-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {query.page} of {totalPages}
          </span>
          <button
            disabled={query.page >= totalPages}
            onClick={handleNextPage}
            className="p-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ApplicationList;
