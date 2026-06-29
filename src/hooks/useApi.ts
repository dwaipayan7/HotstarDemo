// import { useQuery } from "@tanstack/react-query";
// import { ApiService } from "../services/api";

// export const useHomeData = () => {
//   return useQuery({
//     queryKey: ["homeData"],
//     queryFn: () => ApiService.getHomeData(),
//   });
// };

// export const useContentDetails = (id: string) => {
//   return useQuery({
//     queryKey: ["content", id],
//     queryFn: () => ApiService.getContentDetails(id),
//     enabled: !!id,
//   });
// };

// export const useSearch = (query: string) => {
//   return useQuery({
//     queryKey: ["search", query],
//     queryFn: () => ApiService.searchContent(query),
//     enabled: query.length > 0,
//   });
// };

// export const useUserProfile = () => {
//   return useQuery({
//     queryKey: ["userProfile"],
//     queryFn: () => ApiService.getUserProfile(),
//   });
// };
