import { NavLink } from "react-router-dom";

function ApplicationItem({ item }) {
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-600",
      rejected: "bg-red-100 text-red-600",
    };

    const current = status?.toLowerCase() || "pending";
    const style = styles[current] || styles.pending;

    return (
      <span
        className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${style}`}
      >
        {current}
      </span>
    );
  };

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center w-full border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors">
      {/* Applicant */}
      <div className="w-full sm:w-1/6 py-4 px-4 text-sm font-medium text-foreground">
        <div>{item.Mentor?.Student?.name || "—"}</div>
        <NavLink
          to={`/application-detail/${item._id}/details`}
          className="text-xs text-blue-600 hover:underline"
        >
          mentorId
        </NavLink>
      </div>

      {/* Motivation */}
      <div
        className="w-full sm:w-1/4 py-4 px-4 text-sm text-foreground truncate"
        title={item.motivation}
      >
        {item.motivation
          ? `${item.motivation.substring(0, 30)}...`
          : "—"}
      </div>

      {/* Experience */}
      <div
        className="w-full sm:w-1/4 py-4 px-4 text-sm text-foreground truncate"
        title={item.experience}
      >
        {item.experience
          ? `${item.experience.substring(0, 30)}...`
          : "—"}
      </div>

      {/* Status */}
      <div className="w-full sm:w-1/6 py-4 px-4 flex sm:justify-end">
        {getStatusBadge(item.status)}
      </div>

      {/* Action */}
      <div className="w-full sm:w-1/6 py-4 px-4 flex sm:justify-end">
        <NavLink
          to={`/application-detail/${item._id}`}
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </li>
  );
}

export default ApplicationItem;
