import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLikes } from "../../services/apiLikes";
import { useParams } from "react-router-dom";

export function useCreateLikes() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, mutate: createLike } = useMutation({
    mutationFn: (newLike) => createLikes(newLike),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      queryClient.invalidateQueries(["active-post", postId]);
    },
  });

  return { isLoading, createLike };
}
