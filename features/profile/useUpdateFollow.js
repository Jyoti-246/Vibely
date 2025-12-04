import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUpdateFollow } from "../../services/apiFollowers";
import toast from "react-hot-toast";

export function useUpdateFollow() {
  const queryClient = useQueryClient();

  const {
    mutate: updateFollow,
    isLoading,
    error,
  } = useMutation({
    mutationFn: getUpdateFollow,
    onSuccess: () => {
      toast.success("Follow successfully updated");

      queryClient.invalidateQueries({
        queryKey: ["followers"],
      });
    },

    onError: () => toast.onError("Follow could not updated"),
  });

  return { updateFollow, isLoading, error };
}
