import { useQuery } from "@tanstack/react-query";
import { getUserMetadataByUsername } from "../../services/apiUserMetadata";

export function useMetaDataByUsername(user_name) {
  const {
    isLoading,
    data: metaData,
    error,
  } = useQuery({
    queryKey: ["userMetadata", user_name],
    queryFn: () => getUserMetadataByUsername(user_name),
    enabled: !!user_name,
  });

  return { isLoading, metaData, error };
}
