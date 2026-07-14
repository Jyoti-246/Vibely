import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStory as deleteStoryApi } from "../../services/apiStories";

export function useDeleteStory() {
  const queryClient = useQueryClient();

  const { mutate: deleteStory, isPending: isDeleting } = useMutation({
    mutationFn: deleteStoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  return { deleteStory, isDeleting };
}
