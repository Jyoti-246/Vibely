import { useQuery } from "@tanstack/react-query";
import { getAllFollowers } from "../../services/apiFollowers";

export function useAllFollowers(userId) {
  const {
    data: allFollowers,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAllFollowers(userId),
    queryKey: ["followers", userId],
  });

  return { allFollowers, isLoading, error };
}
