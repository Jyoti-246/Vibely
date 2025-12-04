import { useQuery } from "@tanstack/react-query";
import { getUserMetadata } from "../../services/apiUserMetadata";

export function useMetaData(email) {
  const {
    isLoading,
    data: metaData,
    error,
  } = useQuery({
    queryKey: ["userMetadata", email],
    queryFn: () => getUserMetadata(email),
    enabled: !!email,
  });

  return { isLoading, metaData, error };
}
