import { useQuery } from "@tanstack/react-query";
import {  counselorAPI } from "../../service/client.jsx";

export const useMentees = (counselorId, query) => {
  console.log("this is counselor id", counselorId)
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["user", counselorId, query],
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
