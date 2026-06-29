import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "./QUERY_KEYS";
import { ApiService } from "./api";

export const useHomeData = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.Home.home],
    queryFn: async () => {
      const res = await ApiService.getHomeData();
      if (!res.success) {
        throw new Error("Failed to load the data");
      }
      return res.data;
    },
  });
};
