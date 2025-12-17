import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { adminAssignmentAPI } from "../../service/client";

export default function CounselorList() {
  const [professionType, setProfessionType] = useState("all");
  const [query, setQuery] = useState({
    q: "",
    sort: "name",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["counselors", professionType, query],
    queryFn: async () => {
      if (professionType === "all") {
        return await adminAssignmentAPI.getCounselors({ ...query });
      } else {
        return await adminAssignmentAPI.getCounselors({ profession: professionType, ...query });
      }
    },
    keepPreviousData: true,
    retry: false,
  });

  if (isLoading) return <p className="p-6 text-sm text-foreground">Loading counselors...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Failed to load counselors.</p>;

  const counselors = data?.data?.data || [];
  const results = data?.data?.results || 0;
  const totalPages = Math.ceil(results / query.limit);

  return (
    <div className="flex flex-col w-full bg-background text-foreground border border-border rounded-lg px-5 py-5">
      {/* Header + Filter/Search */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-2xl font-bold text-foreground">Counselor Management</h2>

        <div className="flex gap-2 flex-wrap items-center">
          {/* Filter by profession */}
          <label className="text-sm font-medium flex items-center gap-2">
            Filter by Profession:
            <select
              value={professionType}
              onChange={(e) => {
                setProfessionType(e.target.value);
                setQuery((prev) => ({ ...prev, page: 1 }));
              }}
              className="border rounded-md p-2 text-sm bg-background"
            >
              <option value="all">All</option>
              <option value="therapist">Therapist</option>
              <option value="psychology">Psychology</option>
            </select>
          </label>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name"
            value={query.q}
            onChange={(e) => setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))}
            className="w-[200px] p-2 border rounded"
          />

          {/* Sort */}
          <select
            value={query.sort}
            onChange={(e) => setQuery((prev) => ({ ...prev, sort: e.target.value, page: 1 }))}
            className="w-[160px] p-2 border rounded"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col w-full bg-background px-0">
        <Card className="bg-background text-foreground border border-border rounded-xl">
          <CardContent className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              {counselors.length === 0 ? (
                <div className="py-10 text-center text-muted-foreground">
                  No counselors found.
                </div>
              ) : (
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-foreground/20">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Name</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Profession</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Email</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {counselors.map((c) => (
                      <tr
                        key={c._id}
                        className="border-b border-border hover:bg-muted/30 transition"
                      >
                        <td className="py-4 px-4 text-sm font-medium text-left">{c.user?.name || "—"}</td>
                        <td className="py-4 px-4 text-sm text-left">
                          <Badge className="capitalize bg-gray-100 text-gray-600">
                            {c.profession || "—"}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-sm text-left">{c.user?.email || "—"}</td>
                        <td className="py-4 px-4 text-right">
                          <NavLink
                            to={`/counselors/${c._id}`}
                            className="text-xs font-semibold px-3 py-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            View Details
                          </NavLink>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer: Add Counselor + Pagination Inline */}
      <div className="flex justify-between items-center mt-4 flex-wrap gap-2 text-sm text-muted-foreground">
  
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
              onClick={() => setQuery((prev) => ({ ...prev, page: prev.page + 1 }))}
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
