import { useQuery } from "@tanstack/react-query";
import { getUserMetadataById } from "../../services/apiUserMetadata";

export function useMetaDataById(userId) {
  const {
    isLoading,
    data: metaData,
    error,
  } = useQuery({
    queryKey: ["userMetadata", userId],
    queryFn: () => getUserMetadataById(userId),
    enabled: !!userId,
  });

  return { isLoading, metaData, error };
}
