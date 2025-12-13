import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAssignmentAPI } from "../../service/client";

export default function AdminMentorMenteeAssignment() {
  const queryClient = useQueryClient();
  const [selectedCounselor, setSelectedCounselor] = useState("");

  // =============================
  // Fetch Counselors (Applications)
  // =============================
  const {
    data: counselorsData,
    isLoading: counselorsLoading,
    isError: counselorsError,
  } = useQuery({
    queryKey: ["counselors"],
    queryFn: adminAssignmentAPI.getCounselors,
  });

  // Safely extract counselors array
  const counselors = counselorsData?.data?.data || [];
  console.log("Available counselors:", counselors);

  // =============================
  // Fetch Ranked Mentees
  // =============================
  const {
    data: rankedMenteesData,
    isLoading: menteesLoading,
    isError: menteesError,
  } = useQuery({
    queryKey: ["rankedMentees", selectedCounselor],
    queryFn: () => adminAssignmentAPI.getRankedMentees(selectedCounselor),
    enabled: !!selectedCounselor,
  });

  const rankedMentees = rankedMenteesData?.rankedMentees || [];

  // =============================
  // Assign Mentee Mutation
  // =============================
  const assignMutation = useMutation({
    mutationFn: adminAssignmentAPI.assignMentee,
    onSuccess: () => {
      queryClient.invalidateQueries(["rankedMentees", selectedCounselor]);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Mentor–Mentee Assignment
          </h1>
          <p className="text-gray-600 mt-2">
            Select a counselor and assign the most suitable mentees based on compatibility.
          </p>
        </div>

        {/* Counselor Selector */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Counselor
          </label>
          <select
            value={selectedCounselor}
            onChange={(e) => setSelectedCounselor(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Choose Counselor --</option>
            {counselorsLoading ? (
              <option>Loading...</option>
            ) : counselorsError ? (
              <option>Error loading counselors</option>
            ) : (
              counselors.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.user?.name || "Unknown"} – {c.profession || "N/A"}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Ranked Mentees */}
        {selectedCounselor && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Ranked Mentees
            </h2>

            {menteesLoading ? (
              <p className="text-gray-500">Loading mentees...</p>
            ) : menteesError ? (
              <p className="text-red-500">Error fetching mentees</p>
            ) : rankedMentees.length === 0 ? (
              <p className="text-gray-500">No mentees available</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rankedMentees.map((item) => (
                  <div
                    key={item.menteeId}
                    className="border rounded-2xl p-5 hover:shadow-lg transition"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <span className="text-sm font-bold text-indigo-600">
                        {Math.round(item.finalScore * 100)}% Match
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1 mb-4">
                      <p>
                        <strong>Goals:</strong> {item.goals?.join(", ") || "N/A"}
                      </p>
                      <p>
                        <strong>Availability:</strong> {item.availability || "N/A"}
                      </p>
                      <p>
                        <strong>Support Areas:</strong>{" "}
                        {item.issues?.join(", ") || "N/A"}
                      </p>
                    </div>

                    <button
                      disabled={assignMutation.isLoading}
                      onClick={() =>
                        assignMutation.mutate({
                          counselorId: selectedCounselor,
                          menteeId: item.menteeId,
                        })
                      }
                      className="w-full rounded-xl bg-indigo-600 text-white py-2 font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                      Assign Mentee
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
