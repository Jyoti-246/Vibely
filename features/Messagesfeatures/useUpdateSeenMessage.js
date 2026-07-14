import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSeenMessage } from "../../services/apiMessages";

export function useUpdateSeenMessage() {
  const queryClient = useQueryClient();

  const {
    mutate: updateSeen,
    isLoading,
    error,
  } = useMutation({
    mutationFn: ({ fromUser, toUser }) => updateSeenMessage(fromUser, toUser),
    mutationKey: ["messages"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return { updateSeen, isLoading, error };
}
