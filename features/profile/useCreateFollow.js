import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCreateFollow } from "../../services/apiFollowers";
import toast from "react-hot-toast";

export function useCreateFollow() {
  const queryClient = useQueryClient();
  const {
    mutate: createFollow,
    error,
    isLoading,
  } = useMutation({
    mutationFn: (newFollow) => getCreateFollow(newFollow),
    onSuccess: () => {
      toast.success("New Follow successfully created");

      queryClient.invalidateQueries({
        queryKey: ["followers"],
      });
    },

    onError: (err) => toast.error(err.message),
  });

  return { createFollow, isLoading, error };
}
