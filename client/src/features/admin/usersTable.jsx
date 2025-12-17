import React from "react";
import { NavLink } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card.jsx";
import { Badge } from "../../components/ui/badge.jsx";

export default function UsersTable({ users = [] }) {
  return (
    <div className="flex flex-col w-full bg-background px-0">
      <Card className="bg-background text-foreground border border-border rounded-xl">
        <CardContent className="overflow-x-auto">
          <div className="max-h-[500px] overflow-y-auto">
            {users.length === 0 ? (
              <div className="py-10 text-center text-muted-foreground">
                No users found.
              </div>
            ) : (
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr className="border-b border-foreground/20">
                    <th className="text-left py-3 px-4 text-sm font-medium text-foreground/60">
                      Name
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-foreground/60">
                      Email
                    </th>
                    <th className="text-center py-3 px-4 text-sm font-medium text-foreground/60">
                      Role
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-foreground/60">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user._id || user.sims_id}
                      className="border-b border-border hover:bg-muted/30 transition"
                    >
                      <td className="py-4 px-4 text-sm text-left font-medium">{user.name}</td>
                      <td className="py-4 px-4 text-sm">{user.email || "—"}</td>
                      <td className="py-4 px-4 text-sm">
                        <Badge
                          className={`capitalize ${
                            user.role === "mentor"
                              ? "bg-blue-100 text-blue-600"
                              : user.role === "mentee"
                              ? "bg-green-100 text-green-600"
                              : user.role === "user-union"
                              ? "bg-purple-100 text-purple-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-4 text-right">
                        <NavLink
                          to={`/user-detail/${user._id}`}
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
