import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUpdateFollow } from "../../services/apiFollowers";

export function useUpdateFollow() {
  const queryClient = useQueryClient();

  const {
    mutate: updateFollow,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getUpdateFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"] });
      queryClient.invalidateQueries({ queryKey: ["specific-follow-info"] });
    },
  });

  return { updateFollow, isLoading, error };
}
