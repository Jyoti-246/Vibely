import { useQuery } from "@tanstack/react-query";
import { getCurrentProfilePosts } from "../../services/apiPosts";

export function useCurrentUserPosts(currentUserId) {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts", currentUserId],
    queryFn: () => getCurrentProfilePosts(currentUserId),
  });

  return { isLoading, posts, error };
}
