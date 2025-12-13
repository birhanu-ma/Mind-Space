import { NavLink } from "react-router-dom";

export default function CounselorItem({ counselor }) {
  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center w-full border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors">
      {/* Name */}
      <div className="w-full sm:w-1/3 py-4 px-4 text-sm font-medium text-foreground">
        {counselor.user?.name || "—"}
      </div>

      {/* Profession */}
      <div className="w-full sm:w-1/3 py-4 px-4 text-sm text-foreground">
        {counselor.profession || "—"}
      </div>

      {/* Action */}
      <div className="w-full sm:w-1/3 py-4 px-4 flex sm:justify-end">
        <NavLink
          to={`/counselors/${counselor._id}`}
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </li>
  );
}
