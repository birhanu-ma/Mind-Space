import { NavLink } from "react-router-dom";

function ApplicationItem({ item }) {
  console.log(item);
  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      approved: "bg-green-500 text-white border-green-200",
      rejected: "bg-red-500 text-white border-red-200",
    };
    const current = status?.toLowerCase() || "pending";
    const style = styles[current] || styles.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${style}`}
      >
        {current.charAt(0).toUpperCase() + current.slice(1)}
      </span>
    );
  };

  return (
    <li className="flex flex-col sm:flex-row w-full items-start sm:items-center px-4 sm:px-6 py-4 hover:bg-background text-foreground border border-border transition-colors gap-2 sm:gap-0">
      {/* Applicant */}
      <div className="w-full sm:w-1/6 flex flex-col sm:block">
        <div className="text-sm font-medium text-foreground mb-1 sm:mb-0">
          {item.Mentor?.Student?.name || "N/A"}
        </div>
        <NavLink
          to={`/application-detail/${item._id}/details`}
          className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
        >
          <p>mentorId</p>
        </NavLink>
      </div>

      {/* Motivation */}
      <div
        className="w-full sm:w-1/4 text-foreground font-medium truncate"
        title={item.motivation}
      >
        {item.motivation ? `${item.motivation.substring(0, 30)}...` : "N/A"}
      </div>

      {/* Experience */}
      <div
        className="w-full sm:w-1/4 text-foreground font-medium truncate"
        title={item.experience}
      >
        {item.experience ? `${item.experience.substring(0, 30)}...` : "N/A"}
      </div>

      {/* Status */}
      <div className="w-full sm:w-1/6 flex justify-start sm:justify-end">
        {getStatusBadge(item.status)}
      </div>

      {/* Action */}
      <div className="w-full sm:w-1/6 flex justify-start sm:justify-end">
        <NavLink
          to={`/application-detail/${item._id}/details`}
          className="text-xs font-semibold px-3 py-1 rounded-md border bg-blue-500 hover:bg-blue-600 text-white transition-colors"
        >
          View Details
        </NavLink>
      </div>
    </li>
  );
}

export default ApplicationItem;
