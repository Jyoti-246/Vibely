import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory as createStoryApi } from "../../services/apiStories";

export function useCreateStory() {
  const queryClient = useQueryClient();

  const { mutate: createStory, isPending: isCreating } = useMutation({
    mutationFn: (newStory) => createStoryApi(newStory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  return { isCreating, createStory };
}
