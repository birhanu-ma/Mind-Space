import { NavLink } from "react-router-dom";

function PetitionItem({ item }) {
  const getStatusBadge = (status) => {
    const statusStyles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-500 text-white border-green-200",
      rejected: "bg-red-500 text-white border-red-200",
    };

    const currentStatus = status?.toLowerCase() || "pending";
    const style = statusStyles[currentStatus] || statusStyles.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${style}`}
      >
        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
      </span>
    );
  };

  return (
    <li className="flex flex-col sm:flex-row w-full items-start sm:items-center px-4 sm:px-6 py-4 hover:bg-background text-foreground border border-border transition-colors gap-2 sm:gap-0">
      {/* Mentee Info */}
      <div className="w-full sm:w-1/6 flex flex-col sm:block">
        <div className="text-sm font-medium text-foreground mb-1 sm:mb-0">
          {item.mentee?.Student?.full_name || "N/A"}
        </div>
        <div className="text-xs text-blue-600">ID: {item.mentee_id}</div>
      </div>

      {/* Current Mentor */}
      <div className="w-full sm:w-1/6 text-foreground font-medium">
        <div className="text-sm">
          {item.currentMentor?.Student?.full_name || "N/A"}
        </div>
        <div className="text-xs text-gray-500">
          ID: {item.current_mentor_id}
        </div>
      </div>

      {/* Title */}
      <div className="w-full sm:w-1/4 text-foreground font-medium">
        <div className="truncate" title={item.title}>
          {item.title || "N/A"}
        </div>
      </div>

      {/* Reason */}
      <div className="w-full sm:w-1/4 text-foreground font-medium">
        <div className="truncate" title={item.reason}>
          {item.reason ? `${item.reason.substring(0, 30)}...` : "N/A"}
        </div>
      </div>

      {/* Status */}
      <div className="w-full sm:w-1/6 flex justify-start sm:justify-end">
        {getStatusBadge(item.status)}
      </div>

      {/* View Details Button */}
      <div className="w-full sm:w-1/6 flex justify-start sm:justify-end">
        <NavLink
          to={`/petition-detail/${item._id}/details`} // Adjust route as needed
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </li>
  );
}

export default PetitionItem;
