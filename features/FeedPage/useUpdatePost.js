import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdatePost } from "../../services/apiPosts";
import toast from "react-hot-toast";

export function useUpdatePost() {
  const queryClient = useQueryClient();

  const { mutate: updatePost, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newPost, id }) => createUpdatePost(newPost, id),
    onSuccess: () => {
      toast.success("Post successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { updatePost, isUpdating };
}
