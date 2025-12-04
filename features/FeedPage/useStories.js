import { useQuery } from "@tanstack/react-query";
import { getStories } from "../../services/apiStories";

export function useStories(followers) {
  const {
    isLoading,
    data: storiesData,
    error,
  } = useQuery({
    queryKey: ["stories", followers],
    queryFn: () => getStories(followers),
  });

  return { isLoading, storiesData, error };
}
