import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeleteRequestFollow } from "../../services/apiFollowers";

export function useDeleteRequestFollow() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteRequest,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getDeleteRequestFollow,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["followers"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["specific-follow-info"] });
    },
  });

  return { deleteRequest, isLoading, error };
}
