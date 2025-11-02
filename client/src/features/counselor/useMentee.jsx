import { useQuery } from "@tanstack/react-query";
import { mentorAPI } from "../../service/client.jsx";

export const useMentees = ( query) => {
  const mentorId = localStorage.getItem("id");
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["students", mentorId, query, mentorId],
    queryFn: () => mentorAPI.getMentees({ ...query, mentorId }),
    keepPreviousData: true,
    enabled: !!mentorId,
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
