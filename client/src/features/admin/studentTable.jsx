import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StudentsTable({
  students = [],
  role,
  setRole,
  title,
  total = 0,
  subtitle,
  query,
  setQuery,
}) {
  const [searchTerm, setSearchTerm] = useState(query.q || "");

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery((prev) => ({ ...prev, q: searchTerm, page: 1 }));
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  return (
    <div className="flex flex-col sm:flex-row w-full bg-background px-5">
      <div className="w-full flex flex-col gap-5">
        <Card className="bg-background text-foreground border border-border rounded-xl">
          <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-2xl font-bold text-[#464255]">
                {title}
              </CardTitle>
              <p className="text-sm text-[#00b087] mt-1">{subtitle}</p>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              {/* Role Filter */}
              <select
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                  setQuery((prev) => ({ ...prev, page: 1 }));
                }}
                className="w-[160px] p-2 border rounded"
              >
                <option value="All">All</option>
                <option value="mentee">Mentee</option>
                <option value="mentor">Mentor</option>
                <option value="student-union">Student Union</option>
              </select>

              {/* Search */}
              <Input
                placeholder="Search by name or ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[200px]"
              />

              {/* Sort */}
              <select
                value={query.sort}
                onChange={(e) =>
                  setQuery((prev) => ({
                    ...prev,
                    sort: e.target.value,
                    page: 1,
                  }))
                }
                className="w-[120px] p-2 border rounded"
              >
                <option value="name">Name</option>
                <option value="sims_id">ID</option>
                <option value="major">Department</option>
              </select>
            </div>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <div className="max-h-[500px] overflow-y-auto">
              {students.length === 0 ? (
                <div className="py-10 text-center text-gray-500">
                  No students found.
                </div>
              ) : (
                <table className="w-full min-w-[800px] border-collapse">
                  <thead>
                    <tr className="border-b border-foreground/20">
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Student Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        ID
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Department
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Role
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {students.map((student) => (
                      <tr
                        key={student._id || student.sims_id}
                        className="border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors"
                      >
                        <td className="py-4 text-left px-4 text-sm font-medium">
                          {student.name}
                        </td>
                        <td className="py-4 text-left px-4 text-sm">
                          {student.sims_id}
                        </td>
                        <td className="py-4 text-left px-4 text-sm">
                          {student.major}
                        </td>
                        <td className="py-4 text-left px-4 text-sm">
                          {student.email || "—"}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <Badge
                            className={`capitalize ${
                              student.role === "mentor"
                                ? "bg-blue-100 text-blue-600"
                                : student.role === "mentee"
                                ? "bg-green-100 text-green-600"
                                : student.role === "student-union"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {student.role}
                          </Badge>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <NavLink
                            to={`/student-detail/${student._id}/details`}
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

            {/* Pagination */}
            {total > 0 && (
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>
                  Showing {(query.page - 1) * query.limit + 1}–
                  {Math.min(query.page * query.limit, total)} of {total}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    disabled={query.page <= 1}
                    onClick={() =>
                      setQuery((prev) => ({ ...prev, page: prev.page - 1 }))
                    }
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span>Page {query.page}</span>
                  <button
                    disabled={students.length < query.limit}
                    onClick={() =>
                      setQuery((prev) => ({ ...prev, page: prev.page + 1 }))
                    }
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
