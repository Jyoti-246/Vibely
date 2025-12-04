import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLikes } from "../../services/apiLikes";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useCreateLikes() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, mutate: createLike } = useMutation({
    mutationFn: (newLike) => createLikes(newLike),

    onSuccess: () => {
      toast.success("Like successfully created");

      queryClient.invalidateQueries({ queryKey: ["likes"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      queryClient.invalidateQueries(["active-post", postId]);
    },

    onError: (err) => toast.error(err.message),
  });

  return { isLoading, createLike };
}
