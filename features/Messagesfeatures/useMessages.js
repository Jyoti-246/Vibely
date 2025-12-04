import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../services/apiMessages";

export function useMessages(userId) {
  const {
    isLoading,
    data: messagesData,
    error,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getMessages(userId),
    enabled: !!userId,
  });

  return { isLoading, messagesData, error };
}
