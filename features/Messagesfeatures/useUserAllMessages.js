import { useQuery } from "@tanstack/react-query";
import { getUserAllMessages } from "../../services/apiMessages";

export function useUserAllMessages(userId) {
  const {
    data: allMessages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["messages", userId],
    queryFn: () => getUserAllMessages(userId),
    enabled: !!userId,
  });

  return { allMessages, isLoading, error };
}
