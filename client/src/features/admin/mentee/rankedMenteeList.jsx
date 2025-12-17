import { useQuery } from "@tanstack/react-query";
import { adminAssignmentAPI } from "../../../service/client";
import RankedMenteeItem from "./rankedMenteeItem";
import Spinner from "../../../components/ui/Spinner.jsx";

export default function RankedMenteeList({ counselorId }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rankedMentees", counselorId],
    queryFn: () => adminAssignmentAPI.getRankedMentees(counselorId),
  });

  const mentees = data?.rankedMentees || [];

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">Failed to load mentees.</p>;
  if (!mentees.length) return <p>No ranked mentees available.</p>;

  return (
    <ul className="bg-white border border-border rounded-lg divide-y divide-border mt-4">
      <li className="flex px-6 py-3  font-semibold  bg-gray-100">
        <div className="w-1/4">Name</div>
        <div className="w-1/4">  Support Areas</div>
        <div className="w-1/4">Match Score</div>
        <div className="w-1/4 text-right">Action</div>
      </li>

      {mentees.map((item) => {
        const { user, _id } = item;

        // Skip item if user or _id is missing
        if (!user || !_id) return null;

        return (
          <RankedMenteeItem
            key={_id} // Use ranking document _id as key
            item={item}
            counselorId={counselorId}
          />
        );
      })}
    </ul>
  );
}
