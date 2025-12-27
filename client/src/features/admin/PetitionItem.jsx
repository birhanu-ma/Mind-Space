// components/admin/PetitionItem.jsx
import React from "react";
import { format } from "date-fns";
import { Badge } from "../../components/ui/badge.jsx";
import { NavLink } from "react-router-dom";

export default function PetitionItem({ petition }) {
  const { _id, user, subject, body, status, createdAt, reviewedBy } = petition;

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="p-4 md:p-6 hover:bg-muted/30 transition">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Petitioner */}
        <div className="md:col-span-3">
          <div className="flex items-center gap-3">
            <img
              src={
                user?.photo && user.photo !== "default.jpeg"
                  ? `http://localhost:5000/img/users/${user.photo}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "User")}`
              }
              alt={user?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground capitalize">
                {user?.name || "Unknown User"}
              </p>
              <p className="text-sm text-gray-500">{user?.email}</p>
              <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Subject & Preview */}
        <div className="md:col-span-3">
          <p className="font-medium text-foreground">{subject}</p>
          <p className="text-sm text-gray-600 line-clamp-2 mt-1">
            {body || "No description"}
          </p>
        </div>

        {/* Date */}
        <div className="md:col-span-2 text-sm text-gray-600">
          {format(new Date(createdAt), "MMM d, yyyy")}
          <br />
          <span className="text-xs">
            {format(new Date(createdAt), "h:mm a")}
          </span>
        </div>

        {/* Status */}
        <div className="md:col-span-2 text-center">
          <Badge className={statusColors[status] || "bg-gray-100"}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          {reviewedBy && (
            <p className="text-xs text-gray-500 mt-1">
              by {reviewedBy.name}
            </p>
          )}
        </div>

        {/* Actions - FIXED ROUTE */}
        <div className="md:col-span-2 text-right">
          <NavLink to={`/petition-detail/${_id}`}>  {/* ← CHANGED HERE */}
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Review
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}