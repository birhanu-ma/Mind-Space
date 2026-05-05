import React from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "../../components/ui/badge.jsx";

export default function UsersTable({ users = [] }) {
  return (
    /* The outermost div now has 'overflow-x-auto' which is the secret.
       This acts as the "empty wrapper" that allows the table to be 
       wider than the screen without breaking the rest of the layout.
    */
    <div className="w-full overflow-x-auto bg-background">
      {users.length === 0 ? (
        <div className="py-10 text-center text-muted-foreground border border-border rounded-lg">
          No users found.
        </div>
      ) : (
        /* Crucial Change: 
           1. min-w-[800px] -> Forces the list to stay wide and readable.
           2. table-fixed -> Prevents columns from shrinking based on text length.
        */
        <table className="min-w-[800px] w-full border-collapse text-left table-fixed">
          <thead>
            <tr className="border-b border-border bg-muted/10">
              {/* Added w-[30%] etc to give each column enough room to breathe */}
              <th className="w-[25%] py-3 px-4 text-xs font-semibold text-foreground/70 uppercase">
                Name
              </th>
              <th className="w-[35%] py-3 px-4 text-xs font-semibold text-foreground/70 uppercase">
                Email
              </th>
              <th className="w-[20%] py-3 px-4 text-center text-xs font-semibold text-foreground/70 uppercase">
                Role
              </th>
              <th className="w-[20%] py-3 px-4 text-right text-xs font-semibold text-foreground/70 uppercase">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id || user.sims_id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="py-4 px-4 text-sm font-medium">
                  <div className="truncate">{user.name}</div>
                </td>
                <td className="py-4 px-4 text-sm text-muted-foreground">
                  <div className="truncate">{user.email || "—"}</div>
                </td>
                <td className="py-4 px-4 text-center">
                  <Badge
                    className={`capitalize text-xs shadow-none border-none ${
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
                <td className="py-4 px-4 text-right">
                  <NavLink
                    to={`/user-detail/${user._id}`}
                    className="inline-block text-xs font-bold px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors whitespace-nowrap"
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
  );
}