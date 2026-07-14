import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePost } from "../../services/apiPosts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: ({ newPost }) => createUpdatePost(newPost),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { isCreating, createPost };
}
