import { useQuery } from "@tanstack/react-query";
import { getLike } from "../../services/apiLikes";

export function useLike() {
  const {
    data: likeData,
    error,
    isLoading,
  } = useQuery({
    queryFn: getLike(),
    queryKey: ["likes"],
  });

  return { likeData, isLoading, error };
}
