"use client";

import React, { useState } from "react";
import { useMentees } from "./useMentee.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Input } from "../../components/ui/input.jsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Spinner from "../../components/ui/Spinner.jsx";
export default function MyMentee() {
    const counselorId = localStorage.getItem("id");
  const [query, setQuery] = useState({
    q: "",
    sort: "name",
    page: 1,
    limit: 10,
  });

  const { data, isLoading, isFetching, isError } = useMentees(counselorId, query);

  if (isLoading) return <Spinner />;
  if (isError)
    return <p className="text-center text-red-500">Failed to load mentees.</p>;
  console.log("mentee list", data);

  const { results, data: dataObj } = data;
  const mentee = dataObj?.mentees || [];
  console.log("this is mentor's mentee list", mentee);

  return (
    <div className="flex flex-col w-full gap-5">
      <Card className="bg-background text-foreground border border-border rounded-xl">
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-2xl font-bold text-[#464255]">
              Mentees List
            </CardTitle>
            <p className="text-sm text-[#00b087] mt-1">
              Active mentees under your mentorship
            </p>
          </div>
          <Input
            placeholder="Search by name or ID"
            value={query.q}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, q: e.target.value, page: 1 }))
            }
            className="max-w-xs"
          />
        </CardHeader>

        <CardContent className="overflow-x-auto min-h-[500px]">
          {isFetching ? (
            <div className="py-10 text-center text-[#737373]">
              <Spinner />
            </div>
          ) : mentee.length === 0 ? (
            <div className="py-10 text-center text-[#737373]">
              No students found.
            </div>
          ) : (
            <>
              <table className="w-full min-w-[700px] border-collapse">
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
                  </tr>
                </thead>
                <tbody>
                  {mentee.map((student) => (
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
                    </tr>
                  ))}
                </tbody>
              </table>

              {results > 0 && (
                <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
                  <span>
                    Showing {(query.page - 1) * query.limit + 1}–
                    {Math.min(query.page * query.limit, results)} of {results}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={query.page <= 1}
                      onClick={() =>
                        setQuery((p) => ({ ...p, page: p.page - 1 }))
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span>Page {query.page}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={mentee.length < query.limit}
                      onClick={() =>
                        setQuery((p) => ({ ...p, page: p.page + 1 }))
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
