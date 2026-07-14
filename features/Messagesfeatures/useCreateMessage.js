import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage as createMessageApi } from "../../services/apiMessages";

export function useCreateMessage() {
  const queryClient = useQueryClient();

  const {
    mutate: createMessage,
    isLoading,
    error,
  } = useMutation({
    mutationFn: createMessageApi,
    mutationKey: ["messages"],
    onSuccess: () => {
      // Refreshes both the open chat (["messages", userId, chatUserId]) and the
      // conversations list (["messages", userId]).
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return { createMessage, isLoading, error };
}
