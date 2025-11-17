import { useQuery } from "@tanstack/react-query";
import { menteeAPI } from "../../service/client";
export function useMentor() {
  const menteeId = localStorage.getItem("id");


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["mentorInfo", menteeId],
    queryFn: () => menteeAPI.getCounselor(menteeId),
    retry: false,
    enabled: !!menteeId,
  });

  return {
    data,
    isLoading,
    isError,
    error,
  };
}
