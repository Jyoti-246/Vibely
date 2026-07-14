import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLike as deleteLikeApi } from "../../services/apiLikes";
import { useParams } from "react-router-dom";

export function useDeleteLike() {
  const { postId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteLike, isLoading: isDeleting } = useMutation({
    mutationFn: deleteLikeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["posts"], exact: false });
      queryClient.invalidateQueries(["active-post", postId]);
    },
  });

  return { deleteLike, isDeleting };
}
