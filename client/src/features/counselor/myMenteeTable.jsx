"use client";

import React, { useState } from "react";
import { useMentees } from "./useMentee.js";
import { NavLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { Badge } from "../../components/ui/badge.jsx";
import { ChevronLeft, ChevronRight, User, Mail, Calendar } from "lucide-react";
import Spinner from "../../components/ui/Spinner.jsx";

export default function MyMentee() {
  const counselorId = localStorage.getItem("id");

  const [query, setQuery] = useState({
    q: "",
    sort: "name",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching, isError } = useMentees(
    counselorId,
    query
  );

  const totalResults = data?.results || 0;
  const mentees = data?.data?.mentees || [];

  // Loading state
  if (isLoading) return <Spinner />;

  // Error state
  if (isError) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 text-lg">
          Failed to load mentees. Please try again later.
        </p>
      </div>
    );
  }

  const startItem = (query.page - 1) * query.limit + 1;
  const endItem = Math.min(query.page * query.limit, totalResults);

  return (
    <div className="flex flex-col w-full gap-6 p-4 md:p-6">
      <Card className="bg-background text-foreground border border-border rounded-xl shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              My Mentees
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and view all mentees assigned to you
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Input
              placeholder="Search by name or email"
              value={query.q}
              onChange={(e) =>
                setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))
              }
              className="w-full sm:max-w-xs"
            />
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isFetching ? (
              <div className="py-20 text-center">
                <Spinner />
              </div>
            ) : mentees.length === 0 ? (
              <div className="py-20 text-center text-muted-foreground">
                <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p className="text-lg">No mentees assigned yet</p>
                <p className="text-sm mt-2">
                  New mentees will appear here once matched.
                </p>
              </div>
            ) : (
              <table className="w-full min-w-[800px]">
                <thead className="bg-muted/50">
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground/70">
                      Mentee Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground/70">
                      Email
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-foreground/70">
                      Joined On
                    </th>
                    <th className="text-center py-4 px-6 text-sm font-medium text-foreground/70">
                      Status
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-foreground/70">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mentees.map((mentee) => (
                    <tr
                      key={mentee._id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      {/* Name + Photo */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              mentee.photo
                                ? `/uploads/${mentee.photo}`
                                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                    mentee.name
                                  )}&background=random&color=fff`
                            }
                            alt={mentee.name}
                            className="w-10 h-10 rounded-full object-cover border"
                          />
                          <div>
                            <p className="font-medium text-foreground">
                              {mentee.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Mentee
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-5 px-6 text-sm text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {mentee.email || "—"}
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-5 px-6 text-sm text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          {mentee.createdAt
                            ? new Date(mentee.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "—"}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-5 px-6 text-center">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-200">
                          Active
                        </Badge>
                      </td>

                      {/* View Details Button */}
                      <td className="py-5 px-6 text-right">
                        <NavLink
                          to={`/mentee-detail/${mentee._id}`}
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

          {/* Pagination */}
          {totalResults > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 py-4 border-t border-border bg-muted/20">
              <p className="text-sm text-muted-foreground">
                Showing {startItem}–{endItem} of {totalResults} mentees
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={query.page <= 1}
                  onClick={() => setQuery((p) => ({ ...p, page: p.page - 1 }))}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                <span className="text-sm font-medium px-3">
                  Page {query.page}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={mentees.length < query.limit}
                  onClick={() => setQuery((p) => ({ ...p, page: p.page + 1 }))}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
