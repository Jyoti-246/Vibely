import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePost } from "../../services/apiPosts";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { mutate: updatePost, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newPost, id }) => createUpdatePost(newPost, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { updatePost, isUpdating };
}
