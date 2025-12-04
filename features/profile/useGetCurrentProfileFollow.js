import { useQuery } from "@tanstack/react-query";
import { getCurrentProfileFollow } from "../../services/apiFollowers";

export function useGetCurrentProfileFollow(currentUserId, title, status) {
  const {
    data: follow,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["followers", currentUserId, title, status],
    queryFn: () => getCurrentProfileFollow(currentUserId, title, status),
  });

  return { follow, error, isLoading };
}
