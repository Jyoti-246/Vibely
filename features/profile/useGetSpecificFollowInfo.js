import { useQuery } from "@tanstack/react-query";
import { getSpecificFollowInfo } from "../../services/apiFollowers";

export function useGetSpecificFollowInfo(user, request) {
  const {
    data: specificFollowInfo,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getSpecificFollowInfo(user, request),
    queryKey: ["specific-follow-info", user, request],
  });

  return { specificFollowInfo, isLoading, error };
}
