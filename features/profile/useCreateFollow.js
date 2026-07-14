import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCreateFollow } from "../../services/apiFollowers";

export function useCreateFollow() {
  const queryClient = useQueryClient();

  const {
    mutate: createFollow,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (newFollow) => getCreateFollow(newFollow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["specific-follow-info"] });
    },
  });

  return { createFollow, isLoading, error };
}
