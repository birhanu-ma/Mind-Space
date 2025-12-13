import { NavLink } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAssignmentAPI } from "../../service/client";

export default function RankedMenteeItem({ item, counselorId }) {
  const queryClient = useQueryClient();

  const { _id, user, finalScore, supportAreas } = item;

  if (!user || !user._id) return null;

  const assignMutation = useMutation({
    mutationFn: ({ counselorId, menteeId }) =>
      adminAssignmentAPI.assignMentee({ counselorId, menteeId }),
    onSuccess: () =>
      queryClient.invalidateQueries(["rankedMentees", counselorId]),
  });

  return (
    <li className="flex items-center w-full border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors">
      {/* Name */}
      <div className="w-1/4 py-4 px-4 text-sm font-medium text-foreground">
        {user.name || "—"}
      </div>

      {/* Support Areas */}
      <div className="w-1/4 py-4 px-4 text-sm text-foreground/60">
        {supportAreas?.join(", ") || "—"}
      </div>

      {/* Match Score */}
      <div className="w-1/4 py-4 px-4 text-sm font-semibold text-blue-600">
        {Math.round((finalScore || 0) * 100)}%
      </div>

      {/* Actions */}
      <div className="w-1/4 py-4 px-4 flex justify-end gap-2">
        <NavLink
          to={`/mentees/${_id}`}
          className="text-xs font-semibold px-3 py-1 rounded-md border hover:bg-muted transition-colors"
        >
          View
        </NavLink>

        <button
          onClick={() =>
            assignMutation.mutate({ counselorId, menteeId: user._id })
          }
          disabled={assignMutation.isLoading}
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors disabled:opacity-50"
        >
          {assignMutation.isLoading ? "Assigning..." : "Assign"}
        </button>
      </div>
    </li>
  );
}
