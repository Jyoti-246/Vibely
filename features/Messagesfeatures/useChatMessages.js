import { useQuery } from "@tanstack/react-query";
import { getChatMessages } from "../../services/apiMessages";

export function useChatMessages(userId, chatUserId) {
  const {
    data: chatMessages,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getChatMessages(userId, chatUserId),
    queryKey: ["messages", userId, chatUserId],
    enabled: !!(userId && chatUserId),
  });

  return { chatMessages, isLoading, error };
}
