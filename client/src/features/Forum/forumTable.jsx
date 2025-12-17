import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";

export default function ForumTable({ forums = [] }) {
  return (
    <div className="flex flex-col w-full bg-background px-0">
      <Card className="bg-background text-foreground border border-border rounded-xl">
        <CardContent className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            {forums.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                No forums found.
              </div>
            ) : (
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Header</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Sub-header</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">Type</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {forums.map((forum) => (
                    <tr key={forum._id} className="border-b border-border hover:bg-muted/30 transition">
                      <td className="py-4 px-4 text-sm font-medium text-left">{forum.header}</td>
                      <td className="py-4 px-4 text-sm text-left">{forum.subHeader || "—"}</td>
                      <td className="py-4 px-4 text-sm text-left">
                        <Badge
                          className={`capitalize ${
                            forum.forumType === "main"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {forum.forumType}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <NavLink
                          to={`/forum-detail/${forum._id}`}
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
  );
}
