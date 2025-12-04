import { useQuery } from "@tanstack/react-query";
import { getMetaData } from "../../services/apiUserMetadata";

export function useAllMetadata() {
  const {
    data: allMetadata,
    isLoading,
    error,
  } = useQuery({
    queryFn: getMetaData,
    queryKey: ["userMetadata"],
  });

  return { allMetadata, isLoading, error };
}
