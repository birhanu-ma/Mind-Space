import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { petitionAPI } from "../../service/client.jsx";
import { toast } from "sonner";
import PetitionItem from "./PetitionItem.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function PetitionList() {
  const [query, setQuery] = useState({
    q: "",
    status: "all",
    sort: "mentee",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["petitions", query],
    queryFn: () => petitionAPI.getAllPetitions(query),
    keepPreviousData: true,
    onError: () => toast.error("Failed to load petitions"),
  });

  const petitionsData = data?.data || { data: [], results: 0 };
  const petitions = petitionsData.data || [];
  const results = petitionsData.results || 0;
  const totalPages = Math.ceil(results / query.limit);

  const handlePrevPage = () => {
    if (query.page > 1) setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleNextPage = () => {
    if (query.page < totalPages) setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const countByStatus = (status) =>
    petitions.filter((p) => p.status === status).length;

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
        <span className="ml-2">Loading petitions...</span>
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <p>Failed to load petitions</p>
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Petition Management
        </h1>
        <p className="text-gray-600">
          Review and manage mentee petitions for mentor changes
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-yellow-600">
            {countByStatus("pending")}
          </div>
          <div className="text-sm text-gray-600">Pending Petitions</div>
        </div>
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">
            {countByStatus("approved")}
          </div>
          <div className="text-sm text-gray-600">Approved Petitions</div>
        </div>
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-red-600">
            {countByStatus("rejected")}
          </div>
          <div className="text-sm text-gray-600">Rejected Petitions</div>
        </div>
      </div>

      {/* Search, Filter, Sort */}
      <div className="flex flex-wrap gap-2 justify-between mb-4">
        <input
          type="text"
          placeholder="Search by mentee name"
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
          <option value="mentee">Sort by Mentee</option>
          <option value="title">Sort by Title</option>
        </select>
      </div>

      {/* Petition List */}
      <div className="bg-background text-foreground rounded-lg border border-border">
        <div className="px-6 py-4 border-border">
          <h2 className="text-lg font-semibold text-foreground">All Petitions</h2>
        </div>

        <div className="divide-y divide-foreground">
          <div className="hidden sm:flex px-6 py-3 bg-background text-xs font-medium text-foreground uppercase tracking-wider">
            <div className="w-1/6">Mentee</div>
            <div className="w-1/6">Current Mentor</div>
            <div className="w-1/4">Title</div>
            <div className="w-1/4">Reason</div>
            <div className="w-1/6 text-right">Status</div>
            <div className="w-1/6 text-right">Actions</div>
          </div>

          {petitions.map((petition) => (
            <PetitionItem key={petition._id} item={petition} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      {results > 0 && (
        <div className="flex justify-end items-center gap-4 mt-4">
          <button
            disabled={query.page <= 1}
            onClick={() => setQuery((prev) => ({ ...prev, page: prev.page - 1 }))}
            className="p-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {query.page} of {totalPages}
          </span>
          <button
            disabled={query.page >= totalPages}
            onClick={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
            className="p-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PetitionList;
