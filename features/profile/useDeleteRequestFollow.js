import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDeleteRequestFollow } from "../../services/apiFollowers";
import toast from "react-hot-toast";

export function useDeleteRequestFollow() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteRequest,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getDeleteRequestFollow,
    onSuccess: () => {
      toast.success("Request successfully deleted");

      queryClient.invalidateQueries({ queryKey: ["followers"], exact: false });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteRequest, isLoading, error };
}
