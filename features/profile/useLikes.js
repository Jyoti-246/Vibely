import { useQuery } from "@tanstack/react-query";
import { getLikes } from "../../services/apiLikes";

export function useLikes() {
  const {
    data: likesData,
    error,
    isLoading,
  } = useQuery({
    queryFn: getLikes(),
    queryKey: ["likes"],
  });

  return { likesData, isLoading, error };
}
