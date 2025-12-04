import { useQuery } from "@tanstack/react-query";
import { getCurrentActivePost } from "../../services/apiPosts";

export function useCurrentActivePost(currentPostId) {
  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["follow"],
    queryFn: () => getCurrentActivePost(currentPostId),
  });

  return { post, error, isLoading };
}
