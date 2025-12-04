import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeenMessage } from "../../services/apiMessages";
import toast from "react-hot-toast";

export function useUpdateSeenMessage() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSeen,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ fromUser, toUser }) => {
      console.log(toUser);
      console.log(fromUser);

      updateSeenMessage(fromUser, toUser);
    },
    mutationKey: ["messages"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateSeen, isLoading, error };
}
