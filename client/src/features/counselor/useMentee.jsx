import { useQuery } from "@tanstack/react-query";
import {  counselorAPI } from "../../service/client.jsx";

export const useMentees = (counselorId, query) => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["students", counselorId, query],
    queryFn: () => counselorAPI.getMentees({ ...query, counselorId }),
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
