import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deletePostApi } from "../../services/apiPosts";

export function useDeletePost() {
  const queryClient = useQueryClient();

  const { mutate: deletePost, isLoading } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { deletePost, isLoading };
}
