import { useQuery } from "@tanstack/react-query";
import { ApiService } from "./api";

export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: () => ApiService.getUserProfile(),
  });
};
