import { useQuery } from "@tanstack/react-query";
import { mentorAPI } from "../../service/client.jsx";

export const useMentees = (counselorId, query) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["students", counselorId, query],
    queryFn: () => mentorAPI.getMentees({ ...query, counselorId }),
    keepPreviousData: true,
    enabled: !!counselorId,
  });

  const mentees = data?.data?.mentees || [];

  return {
    mentees,
    data,
    isLoading,
    isFetching,
    isError,
  };
};
