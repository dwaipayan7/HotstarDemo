import { useQuery } from "@tanstack/react-query";
import { ApiService } from "./api";
import { QUERY_KEYS } from "./QUERY_KEYS";

export const useContentDetails = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.Content.content, id],
    queryFn: () => ApiService.getContentDetails(id),
    enabled: !!id,
  });
};
