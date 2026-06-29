export type ContentType = "movie" | "series" | "sport" | "show";
export type ContentRating = "U" | "U/A 7+" | "U/A 13+" | "U/A 16+" | "A";

export interface Genre {
  id: string;
  name: string;
}

export interface CastMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface Episode {
  id: string;
  episodeNumber: number;
  seasonNumber: number;
  title: string;
  description: string;
  duration: string;
  thumbnailUrl: string;
  airDate: string;
}

export interface ContentItem {
  id: string;
  title: string;
  type: ContentType;
  thumbnailUrl: string;
  backdropUrl: string;
  description: string;
  rating: ContentRating;
  imdbRating: number;
  releaseYear: number;
  duration?: string;
  totalSeasons?: number;
  totalEpisodes?: number;
  genres: Genre[];
  tags: string[];
  cast: CastMember[];
  director?: string;
  language: string;
  isNew: boolean;
  isPremium: boolean;
  isTrending: boolean;
  watchProgress?: number;
  episodes?: Episode[];
}

export interface HeroBanner {
  id: string;
  contentId: string;
  title: string;
  description: string;
  imageUrl: string;
  logoUrl?: string;
  ctaText: string;
  badgeText?: string;
}

export interface ContentRow {
  id: string;
  title: string;
  items: ContentItem[];
}

export interface HomeData {
  heroBanners: HeroBanner[];
  rows: ContentRow[];
}

export interface SearchResult {
  query: string;
  items: ContentItem[];
}

export interface TrendingSearch {
  id: string;
  query: string;
  imageUrl: string;
}

export type SubscriptionPlan = "Free" | "Super" | "Premium";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  subscriptionPlan: SubscriptionPlan;
  watchlist: ContentItem[];
  recentlyWatched: ContentItem[];
  memberSince: string;
}

export type RootStackParamList = {
  HomeTabs: undefined;
  Detail: { contentId: string };
};

export type BottomTabParamList = {
  Home: undefined;
  Search: undefined;
  Watchlist: undefined;
  Profile: undefined;
};

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
