import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { adminAssignmentAPI } from "../../service/client";

export default function CounselorList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["counselors"],
    queryFn: adminAssignmentAPI.getCounselors,
  });

  const counselors = data?.data?.data || [];

  if (isLoading) return <p className="p-6 text-sm text-foreground">Loading counselors...</p>;

  if (error)
    return (
      <div className="p-6">
        <p className="text-sm text-red-500 mb-2">Failed to load counselors</p>
        <button
          onClick={refetch}
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          Retry
        </button>
      </div>
    );

  if (counselors.length === 0)
    return <p className="p-6 text-sm text-foreground">No counselors found.</p>;

  return (
    <div className="max-w-7xl mx-auto px-5">
      <h1 className="text-2xl font-bold text-[#464255] mb-5">Counselors</h1>

      <div className="bg-background border border-border rounded-xl overflow-hidden">
        {/* Header */}
        <div className="flex border-b border-foreground/20 text-sm font-medium text-foreground/60">
          <div className="w-1/3 py-3 px-4">Name</div>
          <div className="w-1/3 py-3 px-4">Profession</div>
          <div className="w-1/3 py-3 px-4 text-right">Action</div>
        </div>

        {/* Rows */}
        <ul>
          {counselors.map((c) => (
            <li
              key={c._id}
              className="flex items-center border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors"
            >
              <div className="w-1/3 py-4 px-4 text-sm font-medium text-foreground">
                {c.user?.name || "—"}
              </div>

              <div className="w-1/3 py-4 px-4 text-sm text-foreground">
                {c.profession || "—"}
              </div>

              <div className="w-1/3 py-4 px-4 flex justify-end">
                <NavLink
                  to={`/counselors/${c._id}`}
                  className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
                >
                  View Details
                </NavLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
