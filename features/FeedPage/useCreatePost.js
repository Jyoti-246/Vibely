import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createUpdatePost } from "../../services/apiPosts";

export function useCreatePost() {
  const queryClient = useQueryClient();

  const { mutate: createPost, isLoading: isCreating } = useMutation({
    mutationFn: ({ newPost }) => createUpdatePost(newPost),
    onSuccess: () => {
      toast.success("New post successfully created");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createPost };
}
