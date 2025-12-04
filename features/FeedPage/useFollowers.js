import { useQuery } from "@tanstack/react-query";
import { getFollowers } from "../../services/apiFollowers";

export function useFollowers(currentUserId) {
  const {
    data: followers,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["followers"],
    queryFn: () => getFollowers(currentUserId),
    enabled: !!currentUserId,
  });

  return { followers, error, isLoading };
}
