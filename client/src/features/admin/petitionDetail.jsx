// pages/admin/PetitionDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAssignmentAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import { toast } from "sonner";

function PetitionDetail() {
  const { id: petitionId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["petition", petitionId],
    queryFn: () => adminAssignmentAPI.getPetition(petitionId),
    enabled: !!petitionId,
  });

  // Extract the actual petition object (apiResponse.data.data)
  const petition = apiResponse?.data?.data;

  const updateStatusMutation = useMutation({
    mutationFn: ({ status }) =>
      adminAssignmentAPI.reviewPetition({
        petitionId,
        status,
        note: "", // You can later add a note input field if needed
      }),
    onSuccess: () => {
      toast.success("Petition status updated successfully!");
      queryClient.invalidateQueries(["petition", petitionId]);
      queryClient.invalidateQueries(["adminPetitions"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update status");
    },
  });

  const handleAction = (newStatus) => {
    updateStatusMutation.mutate({ status: newStatus });
  };

  if (isLoading) return <Spinner />;
  if (error) {
    return (
      <p className="text-red-500 text-center mt-10">
        Failed to load petition: {error.message}
      </p>
    );
  }
  if (!petition) {
    return <p className="text-center mt-10">No petition found</p>;
  }

  const {
    user,
    subject,
    body,
    status,
    createdAt,
    reviewedBy: reviewer,
  } = petition;

  return (
    <div className="p-8 pt-30 bg-background text-foreground border border-border max-w-7xl mx-auto rounded-lg shadow-xl font-sans">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - User Info & Actions */}
        <div className="col-span-1">
          <div className="text-center md:text-left mb-6">
            <div className="relative w-36 h-36 rounded-full mx-auto md:mx-0 overflow-hidden mb-4 bg-gray-200">
              {user?.photo && user.photo !== "default.jpeg" ? (
                <img
                  src={`http://localhost:5000/img/users/${user.photo}`}
                  alt={user?.name}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 text-4xl font-bold bg-gray-100">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            <h2 className="text-3xl font-semibold text-foreground/80 capitalize">
              {user?.name || "Unknown User"}
            </h2>
            <p className="text-foreground/60 text-sm">{user?.email}</p>
            <p className="text-foreground/60 text-sm capitalize">
              Role: {user?.role || "unknown"}
            </p>
            <p className="text-foreground/60 text-sm">
              Submitted: {new Date(createdAt).toLocaleDateString()}
            </p>
            {reviewer && (
              <p className="text-foreground/60 text-sm">
                Reviewed By: {reviewer.name}
              </p>
            )}

            <span
              className={`inline-block mt-4 px-4 py-2 rounded-full text-sm font-semibold capitalize ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>

            {status === "pending" && (
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => handleAction("approved")}
                  disabled={updateStatusMutation.isPending}
                  className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${
                    updateStatusMutation.isPending
                      ? "bg-green-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700 text-white"
                  }`}
                >
                  {updateStatusMutation.isPending ? "Processing..." : "Approve"}
                </button>

                <button
                  onClick={() => handleAction("rejected")}
                  disabled={updateStatusMutation.isPending}
                  className={`flex-1 px-6 py-3 rounded-md font-semibold transition-colors ${
                    updateStatusMutation.isPending
                      ? "bg-red-400 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 text-white"
                  }`}
                >
                  {updateStatusMutation.isPending ? "Processing..." : "Reject"}
                </button>
              </div>
            )}

            {status !== "pending" && (
              <div className="mt-8 text-center">
                <p className="text-lg text-foreground/70">
                  This petition has already been <strong>{status}</strong>.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Middle Column - Subject & Body */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <div className="mb-10">
            <h3 className="text-xl font-semibold mb-3">Subject</h3>
            <p className="text-foreground/80 text-lg leading-relaxed">
              {subject || "No subject provided"}
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <div className="bg-muted/30 rounded-lg p-6 text-foreground/80 whitespace-pre-wrap leading-relaxed">
              {body || "No description provided."}
            </div>
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <h3 className="text-xl font-semibold mb-6">Petition Summary</h3>
          <div className="space-y-4 text-sm">
            <div>
              <span className="text-foreground/60">Current Status:</span>
              <p className="font-medium capitalize mt-1">{status}</p>
            </div>
            <div>
              <span className="text-foreground/60">Submitted On:</span>
              <p className="font-medium mt-1">
                {new Date(createdAt).toLocaleString()}
              </p>
            </div>
            <div>
              <span className="text-foreground/60">Reviewed By:</span>
              <p className="font-medium mt-1">
                {reviewer ? reviewer.name : "Not reviewed yet"}
              </p>
            </div>
            <div>
              <span className="text-foreground/60">Petitioner Role:</span>
              <p className="font-medium capitalize mt-1">
                {user?.role || "unknown"}
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="mt-10 w-full px-6 py-3 border border-border rounded-md font-medium hover:bg-muted transition"
          >
            ← Back to List
          </button>
        </div>
      </div>
    </div>
  );
}

export default PetitionDetail;