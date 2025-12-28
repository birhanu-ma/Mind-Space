import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProfessionTable({
  professionals = [],
  query,
  setQuery,
  total = 0,
  profession,
  setProfession,
}) {
  const totalPages = Math.ceil(total / query.limit);

  const handlePrevPage = () => {
    if (query.page > 1) setQuery((prev) => ({ ...prev, page: prev.page - 1 }));
  };

  const handleNextPage = () => {
    if (query.page < totalPages) setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="bg-background text-foreground border border-border rounded-lg w-full">
        {/* Header + Filters */}
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
          <div>
            <CardTitle className="text-2xl font-bold text-[#464255]">Professionals List</CardTitle>
          </div>

          <div className="flex gap-2 flex-wrap items-center">
            <input
              type="text"
              placeholder="Search by name"
              value={query.q}
              onChange={(e) => setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))}
              className="border rounded-md p-2 w-[200px]"
            />

            <label className="text-sm font-medium flex items-center gap-2">
              Filter by Type:
              <select
                value={profession}
                onChange={(e) => {
                  setProfession(e.target.value);
                  setQuery((prev) => ({ ...prev, page: 1 }));
                }}
                className="border rounded-md p-2 text-sm bg-background"
              >
                <option value="All">All</option>
                <option value="therapist">Therapist</option>
                <option value="psychology">Psychology</option>
              </select>
            </label>

            <select
              value={query.sort}
              onChange={(e) => setQuery((prev) => ({ ...prev, sort: e.target.value, page: 1 }))}
              className="w-[160px] p-2 border rounded"
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
          </div>
        </CardHeader>

        {/* Table */}
        <CardContent className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            {professionals.length === 0 ? (
              <div className="py-10 text-center text-gray-500">No professionals found.</div>
            ) : (
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Email</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Profession</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {professionals.map((prof) => (
                    <tr
                      key={prof._id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      {/* Name */}
                      <td className="py-4 px-4 text-sm font-medium text-left">
                        {prof.user?.name || "No Name"}
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 text-sm text-left">
                        {prof.user?.email || "-"}
                      </td>

                      {/* Profession */}
                      <td className="py-4 px-4 text-right text-sm">
                        <Badge className="capitalize bg-gray-100 text-gray-600">
                          {prof.profession || "Not specified"}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="py-4 px-4 text-right">
                        <NavLink
                          to={`/profession-detail/${prof._id}`}
                          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
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

          {/* Footer: Add Professional + Pagination */}
          <div className="flex justify-between items-center mt-4 flex-wrap gap-2 text-sm text-muted-foreground">
            <NavLink to="/admin/professions/new">
              <button className="px-4 py-2 bg-blue-500 rounded-lg text-white font-semibold hover:bg-blue-600">
                Add Professional
              </button>
            </NavLink>

            {total > 0 && (
              <div className="flex items-center gap-3">
                <span>
                  Showing {(query.page - 1) * query.limit + 1}–
                  {Math.min(query.page * query.limit, total)} of {total}
                </span>
                <button
                  disabled={query.page <= 1}
                  onClick={handlePrevPage}
                  className="p-2 border rounded disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span>
                  Page {query.page} of {totalPages}
                </span>
                <button
                  disabled={query.page >= totalPages}
                  onClick={handleNextPage}
                  className="p-2 border rounded disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}