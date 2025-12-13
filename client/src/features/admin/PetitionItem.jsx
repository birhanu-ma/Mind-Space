import { NavLink } from "react-router-dom";

function PetitionItem({ item }) {
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-600",
      rejected: "bg-red-100 text-red-600",
    };

    const currentStatus = status?.toLowerCase() || "pending";
    const style = statusStyles[currentStatus] || statusStyles.pending;

    return (
      <span className={`capitalize px-3 py-1 rounded-full text-xs font-medium ${style}`}>
        {currentStatus}
      </span>
    );
  };

  return (
    <li className="flex flex-col sm:flex-row items-start sm:items-center w-full border-b border-[#f3f2f7] hover:bg-muted/30 transition-colors">
      {/* Mentee Info */}
      <div className="w-full sm:w-1/6 py-4 px-4 text-sm font-medium text-foreground">
        <div>{item.mentee?.Student?.full_name || "—"}</div>
        <div className="text-xs text-foreground/60">
          ID: {item.mentee_id}
        </div>
      </div>

      {/* Current Mentor */}
      <div className="w-full sm:w-1/6 py-4 px-4 text-sm text-foreground">
        <div className="font-medium">
          {item.currentMentor?.Student?.full_name || "—"}
        </div>
        <div className="text-xs text-foreground/60">
          ID: {item.current_mentor_id}
        </div>
      </div>

      {/* Title */}
      <div
        className="w-full sm:w-1/4 py-4 px-4 text-sm text-foreground truncate"
        title={item.title}
      >
        {item.title || "—"}
      </div>

      {/* Reason */}
      <div
        className="w-full sm:w-1/4 py-4 px-4 text-sm text-foreground truncate"
        title={item.reason}
      >
        {item.reason ? `${item.reason.substring(0, 30)}...` : "—"}
      </div>

      {/* Status */}
      <div className="w-full sm:w-1/6 py-4 px-4 flex sm:justify-end">
        {getStatusBadge(item.status)}
      </div>

      {/* Action */}
      <div className="w-full sm:w-1/6 py-4 px-4 flex sm:justify-end">
        <NavLink
          to={`/petition-detail/${item._id}`}
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </li>
  );
}

export default PetitionItem;
