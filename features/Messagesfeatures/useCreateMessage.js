import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage as createMessageApi } from "../../services/apiMessages";
import toast from "react-hot-toast";

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
      queryClient.invalidateQueries(["currentChat"]);
    },
    onError: (err) => toast.error(err.message),
  });

  return { createMessage, isLoading, error };
}
