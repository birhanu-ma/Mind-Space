import ApplicationItem from "./ApplicationItem";
import { useQuery } from "@tanstack/react-query";
import { applicationAPI } from "../../service/client";


function ApplicationList() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: applicationAPI.getAllApplications,
  });

  const applications = data?.data?.data || [];

  // const countByStatus = (status) =>
  //   applicatio ns.filter((a) => a.status === status).length;

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-64">
       <p>Loading.....</p>
        <span className="ml-2">Loading applications...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        <p>Failed to load applications</p>
        <button
          onClick={refetch}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );

  if (applications.length === 0)
    return (
      <div className="flex items-center justify-center h-full p-8 text-xl text-gray-500">
        There are no applications yet.
      </div>
    );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Mentor Applications
        </h1>
        <p className="text-gray-600">Review and manage mentor applications</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-yellow-600">
            {countByStatus("pending")}
          </div>
          <div className="text-sm text-gray-600">Pending Applications</div>
        </div>
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-green-600">
            {countByStatus("approved")}
          </div>
          <div className="text-sm text-gray-600">Approved Applications</div>
        </div>
        <div className="bg-background text-foreground p-4 rounded-lg border border-border">
          <div className="text-2xl font-bold text-red-600">
            {countByStatus("rejected")}
          </div>
          <div className="text-sm text-gray-600">Rejected Applications</div>
        </div>
      </div>

      {/* Applications List */}
      <div className="bg-background rounded-lg overflow-hidden border border-border">
        <ul className="divide-y divide-gray-200">
          <li className="flex items-center px-6 py-3 bg-background text-foreground font-medium uppercase tracking-wider">
            <div className="w-1/6">Applicant</div>
            <div className="w-1/4">Motivation</div>
            <div className="w-1/4">Experience</div>
            <div className="w-1/6 text-right">Status</div>
            <div className="w-1/6 text-right">Action</div>
          </li>
          {applications.map((item) => (
            <ApplicationItem item={item} key={item.id} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ApplicationList;
