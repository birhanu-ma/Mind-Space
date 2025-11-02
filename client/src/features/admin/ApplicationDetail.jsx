import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { applicationAPI } from "../../service/client.jsx";
import Spinner from "../../components/ui/Spinner.jsx";
import { toast } from "sonner";

function ApplicationDetail() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const reviewedBy = localStorage.getItem("id"); // ✅ logged-in admin/user ID

  // Fetch application details
  const { data, isLoading, error } = useQuery({
    queryKey: ["applications", id],
    queryFn: () => applicationAPI.getApplicationDetails(id),
  });

  const application = data?.data?.data;

  // Mutation for approve/reject
  const updateStatusMutation = useMutation({
    mutationFn: async ({ status, id, reviewedBy }) =>
      applicationAPI.reviewApplication({ status, id, reviewedBy }),

    onSuccess: (res) => {
      toast.success(`Application ${res?.data?.data?.status} successfully!`);
      queryClient.invalidateQueries(["applications", id]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to update status");
    },
  });

  const handleAction = (newStatus) => {
    updateStatusMutation.mutate({
      status: newStatus,
      id,
      reviewedBy,
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <p>Failed to load application details</p>;
  if (!application) return <p>No application details found.</p>;

  const { motivation, communication, createdAt, status, student } = application;

  const ProgressBar = ({ value, minLabel, maxLabel }) => (
    <div className="mb-4">
      <div className="flex justify-between text-sm text-foreground/60 mb-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <div className="relative h-2 bg-foreground/20 rounded-full overflow-hidden">
        <div
          className="absolute h-full bg-purple-600 rounded-full"
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
    </div>
  );

  const SkillDots = ({ label, score }) => (
    <div className="flex items-center mb-2">
      <span className="w-1/3 text-foreground/60">{label}</span>
      <div className="flex-1 flex space-x-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < score ? "bg-purple-600" : "bg-foreground/20"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-8 pt-30 bg-background text-foreground border border-border max-w-7xl mx-auto rounded-lg shadow-xl font-sans">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="text-center md:text-left mb-6">
            <div className="relative w-36 h-36 rounded-full mx-auto md:mx-0 overflow-hidden mb-4 bg-gray-200" />
            <h2 className="text-3xl font-semibold text-foreground/60">
              Applicant
            </h2>
            <p className="text-foreground/60 text-sm">Student ID: {student}</p>
            <p className="text-foreground/60 text-sm">
              Submitted: {new Date(createdAt).toLocaleDateString()}
            </p>
            {reviewedBy && (
              <p className="text-foreground/60 text-sm">
                Reviewed By: {reviewedBy}
              </p>
            )}
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : status === "approved"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {status}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6">
            <button
              onClick={() => handleAction("approved")}
              disabled={updateStatusMutation.isLoading || status === "approved"}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition-colors ${
                status === "approved"
                  ? "bg-green-300 text-white cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              {updateStatusMutation.isLoading && status !== "rejected"
                ? "Processing..."
                : "Approve"}
            </button>

            <button
              onClick={() => handleAction("rejected")}
              disabled={updateStatusMutation.isLoading || status === "rejected"}
              className={`flex-1 px-4 py-2 rounded-md font-semibold transition-colors ${
                status === "rejected"
                  ? "bg-red-300 text-white cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {updateStatusMutation.isLoading && status !== "approved"
                ? "Processing..."
                : "Reject"}
            </button>
          </div>
        </div>

        {/* Middle Column */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Motivation</h3>
            <p className="text-foreground/60 mb-6">{motivation || "N/A"}</p>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Communication</h3>
            <p className="text-foreground/60 mb-6">{communication || "N/A"}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1 border-l border-foreground/20 pl-8">
          <h3 className="text-xl font-semibold mb-3">Communication Skill</h3>
          <ProgressBar
            value={Number(communication) || 0}
            minLabel="Low"
            maxLabel="High"
          />
          <SkillDots label="Communication" score={Number(communication) || 0} />
        </div>
      </div>
    </div>
  );
}

export default ApplicationDetail;
