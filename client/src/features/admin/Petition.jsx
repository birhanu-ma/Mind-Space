import React from "react";
import { useQuery } from "@tanstack/react-query";
import { petitionAPI } from "../../service/client.jsx";
import { toast } from "sonner";
import PetitionItem from "./PetitionItem.jsx";

function Petition() {
  // Fetch petitions
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["petitions"],
    queryFn: async () => {
      const response = await petitionAPI.getAllPetitions();
      return response || [];
    },
    onError: () => toast.error("Failed to load petitions"),
  });

  const petitions = data?.data?.data || [];

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
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 text-center">
          <p className="text-lg font-semibold mb-2">Error Loading Petitions</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  if (petitions.length === 0)
    return (
      <div className="flex items-center justify-center h-full p-8 text-xl text-gray-500">
        There are no petitions yet.
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

      {/* Stats Cards */}
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

      {/* Petitions List */}
      <div className="bg-background text-foreground rounded-lg border border-border">
        <div className="px-6 py-4 border-border">
          <h2 className="text-lg font-semibold text-foreground">
            All Petitions
          </h2>
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
            <PetitionItem key={petition.id} item={petition} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Petition;
