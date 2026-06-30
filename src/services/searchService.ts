import { useQuery } from "@tanstack/react-query";
import { ApiService } from "./api";
import { QUERY_KEYS } from "./QUERY_KEYS";

export const useSearch = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.Search.search, query],
    queryFn: () => ApiService.searchContent(query),
    enabled: query.length > 0,
  });
};
