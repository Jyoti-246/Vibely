import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";

export function usePosts(follow) {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts", follow],
    queryFn: () => getPosts(follow),
  });

  return { isLoading, posts, error };
}
