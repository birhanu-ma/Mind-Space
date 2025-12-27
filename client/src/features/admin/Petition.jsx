import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminAssignmentAPI } from "../../service/client.jsx"; // Adjust if your API is named differently
import { toast } from "sonner";
import PetitionItem from "./PetitionItem.jsx";
import Spinner from "../../components/ui/Spinner.jsx";

function PetitionList() {
  const [query, setQuery] = useState({
    q: "",              // Search by petitioner name or subject
    status: "all",      // all, pending, approved, rejected
    sort: "newest",     // newest, oldest, mentee
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["adminPetitions", query],
    queryFn: () => adminAssignmentAPI.getAllPetitions(query), // Ensure this endpoint exists
    keepPreviousData: true,
    onError: () => toast.error("Failed to load petitions"),
  });

  // Response shape: { data: { data: [...], results: number } }
  const petitionsData = data?.data || { data: [], results: 0 };
  const petitions = petitionsData.data || [];
  const results = petitionsData.results || 0;
  const totalPages = Math.ceil(results / query.limit);

  const countByStatus = (status) =>
    petitions.filter((p) => p.status === status).length;

  // Loading
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner />
        <span className="ml-3 text-lg">Loading petitions...</span>
      </div>
    );
  }

  // Error
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-red-500">
        <p className="text-lg mb-4">Failed to load petitions</p>
        <button
          onClick={refetch}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Petition Management
        </h1>
        <p className="text-gray-600">
          Review and manage all petitions from mentees and counselors
        </p>
      </div>

      {/* Status Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-foreground">
            {results}
          </div>
          <p className="text-sm text-gray-600 mt-1">Total Petitions</p>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-yellow-700">
            {countByStatus("pending")}
          </div>
          <p className="text-sm text-gray-600 mt-1">Pending Review</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-green-700">
            {countByStatus("approved")}
          </div>
          <p className="text-sm text-gray-600 mt-1">Approved</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-red-700">
            {countByStatus("rejected")}
          </div>
          <p className="text-sm text-gray-600 mt-1">Rejected</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or subject..."
          value={query.q}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))
          }
          className="flex-1 min-w-[200px] px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <select
          value={query.status}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, status: e.target.value, page: 1 }))
          }
          className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <select
          value={query.sort}
          onChange={(e) =>
            setQuery((prev) => ({ ...prev, sort: e.target.value, page: 1 }))
          }
          className="px-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-blue-500"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="mentee">By Petitioner Name</option>
        </select>
      </div>

      {/* Petition List */}
      <div className="bg-background rounded-xl border border-border overflow-hidden shadow-sm">
        {petitions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No petitions found</p>
            {query.q || query.status !== "all" ? (
              <p className="text-sm mt-2">Try adjusting your filters</p>
            ) : null}
          </div>
        ) : (
          <>
            {/* Table Header - Desktop */}
            <div className="hidden md:grid md:grid-cols-12 px-6 py-4 bg-muted/30 text-sm font-medium text-foreground/70 uppercase tracking-wider border-b border-border">
              <div className="col-span-3">Petitioner</div>
              <div className="col-span-3">Subject</div>
              <div className="col-span-2">Submitted</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Petition Items */}
            <div className="divide-y divide-border">
              {petitions.map((petition) => (
                <PetitionItem key={petition._id} petition={petition} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Pagination */}
      {results > query.limit && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setQuery((prev) => ({ ...prev, page: prev.page - 1 }))}
            disabled={query.page <= 1}
            className="px-5 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {query.page} of {totalPages} ({results} total)
          </span>

          <button
            onClick={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
            disabled={query.page >= totalPages}
            className="px-5 py-2 border border-border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default PetitionList;