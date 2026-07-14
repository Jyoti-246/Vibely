import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCreateComment } from "../../services/apiComment";
import { useParams } from "react-router-dom";

export function useCreateComment() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const {
    mutate: createComment,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getCreateComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      queryClient.invalidateQueries(["active-post", postId]);
    },
  });

  return { createComment, isLoading, error };
}
