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
  isLive?: boolean;
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

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export type TSnackbarVariant = "success" | "error" | "warning" | "info";

export const MOCK_CONTENT_DB: ContentItem[] = [
  {
    id: "m1",
    title: "The Silent Echo",
    type: "movie",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    description:
      "A gripping thriller about a detective who loses his hearing but discovers a new way to solve crimes in a bustling city.",
    rating: "U/A 16+",
    imdbRating: 8.2,
    releaseYear: 2024,
    duration: "2h 15m",
    genres: [
      { id: "g1", name: "Thriller" },
      { id: "g2", name: "Drama" },
    ],
    tags: ["Suspense", "Dark", "Mystery"],
    cast: [
      {
        id: "c1",
        name: "John Doe",
        role: "Detective Vance",
        imageUrl: "https://i.pravatar.cc/150?u=1",
      },
      {
        id: "c2",
        name: "Jane Smith",
        role: "Dr. Aris",
        imageUrl: "https://i.pravatar.cc/150?u=2",
      },
    ],
    director: "Christopher Nolan",
    language: "English",
    isNew: true,
    isPremium: true,
    isTrending: true,
  },
  {
    id: "s1",
    title: "Galactic Frontiers",
    type: "series",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
    description:
      "Humanity's first mission beyond the solar system encounters a mysterious artifact that alters the course of history.",
    rating: "U/A 13+",
    imdbRating: 8.8,
    releaseYear: 2023,
    totalSeasons: 2,
    totalEpisodes: 24,
    genres: [
      { id: "g3", name: "Sci-Fi" },
      { id: "g4", name: "Adventure" },
    ],
    tags: ["Space", "Future", "Epic"],
    cast: [
      {
        id: "c3",
        name: "Alice Cooper",
        role: "Captain Reynolds",
        imageUrl: "https://i.pravatar.cc/150?u=3",
      },
    ],
    director: "Ridley Scott",
    language: "English",
    isNew: false,
    isPremium: false,
    isTrending: true,
    episodes: [
      {
        id: "e1",
        episodeNumber: 1,
        seasonNumber: 1,
        title: "The Departure",
        description: "The crew prepares for launch.",
        duration: "45m",
        thumbnailUrl:
          "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&q=80",
        airDate: "2023-01-10T00:00:00Z",
      },
    ],
  },
  {
    id: "sp1",
    title: "Premier League: ARS vs MCI",
    type: "sport",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1518605368461-1ee71168b919?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    description:
      "Live coverage of the top-of-the-table clash between Arsenal and Manchester City.",
    rating: "U",
    imdbRating: 0,
    releaseYear: 2024,
    duration: "Live",
    genres: [
      { id: "g5", name: "Football" },
      { id: "g6", name: "Live Sports" },
    ],
    tags: ["EPL", "Football", "Live"],
    cast: [],
    language: "English",
    isNew: true,
    isPremium: true,
    isTrending: true,
  },
  {
    id: "m2",
    title: "Laugh Riot",
    type: "movie",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80",
    description:
      "Three friends embark on a chaotic road trip that tests their friendship.",
    rating: "U/A 13+",
    imdbRating: 7.1,
    releaseYear: 2022,
    duration: "1h 50m",
    genres: [{ id: "g7", name: "Comedy" }],
    tags: ["Fun", "Road Trip", "Buddy"],
    cast: [],
    language: "Hindi",
    isNew: false,
    isPremium: false,
    isTrending: false,
  },
  {
    id: "m3",
    title: "Into the Wild",
    type: "movie",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1200&q=80",
    description:
      "A breathtaking documentary exploring the untouched parts of the Amazon rainforest.",
    rating: "U",
    imdbRating: 9.0,
    releaseYear: 2024,
    duration: "1h 30m",
    genres: [
      { id: "g8", name: "Documentary" },
      { id: "g9", name: "Nature" },
    ],
    tags: ["Wildlife", "Amazon", "Nature"],
    cast: [],
    director: "David Attenborough",
    language: "English",
    isNew: true,
    isPremium: false,
    isTrending: false,
  },
  {
    id: "s2",
    title: "City of Shadows",
    type: "series",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1517409088653-f7253503c518?w=1200&q=80",
    description:
      "A mafia empire crumbles from within as a young protege seeks vengeance against his mentor.",
    rating: "A",
    imdbRating: 8.9,
    releaseYear: 2021,
    totalSeasons: 4,
    totalEpisodes: 40,
    genres: [
      { id: "g1", name: "Thriller" },
      { id: "g10", name: "Crime" },
    ],
    tags: ["Mafia", "Dark", "Gritty"],
    cast: [],
    language: "English",
    isNew: false,
    isPremium: true,
    isTrending: true,
  },
  {
    id: "sh1",
    title: "Late Night Beats",
    type: "show",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1470229722913-7c090be5c520?w=400&q=80",
    backdropUrl:
      "https://images.unsplash.com/photo-1516280440502-86105f569bd8?w=1200&q=80",
    description:
      "A weekly talk show featuring the biggest names in music and entertainment.",
    rating: "U/A 13+",
    imdbRating: 7.5,
    releaseYear: 2024,
    totalSeasons: 1,
    totalEpisodes: 12,
    genres: [
      { id: "g11", name: "Talk Show" },
      { id: "g7", name: "Comedy" },
    ],
    tags: ["Music", "Celebrity"],
    cast: [],
    language: "English",
    isNew: true,
    isPremium: false,
    isTrending: true,
  },
];

for (let i = 4; i <= 50; i++) {
  MOCK_CONTENT_DB.push({
    id: `m${i}`,
    title: `Mock Movie ${i}`,
    type: i % 3 === 0 ? "series" : "movie",
    thumbnailUrl: `https://picsum.photos/seed/thumb${i}/400/600`,
    backdropUrl: `https://picsum.photos/seed/back${i}/1200/600`,
    description: `This is a generated description for mock content item ${i}. It features a compelling story and amazing visuals.`,
    rating: "U/A 13+",
    imdbRating: parseFloat((Math.random() * (9 - 5) + 5).toFixed(1)),
    releaseYear: 2010 + (i % 15),
    duration: i % 3 === 0 ? undefined : "2h 10m",
    totalSeasons: i % 3 === 0 ? (i % 5) + 1 : undefined,
    genres: [
      { id: "g1", name: "Action" },
      { id: "g2", name: "Drama" },
    ],
    tags: ["Generated", "Mock"],
    cast: [],
    language: i % 2 === 0 ? "English" : "Hindi",
    isNew: i % 5 === 0,
    isPremium: i % 4 === 0,
    isTrending: i % 6 === 0,
  });
}

export const MOCK_HERO_BANNERS: HeroBanner[] = [
  {
    id: "hb1",
    contentId: "m1",
    title: "The Silent Echo",
    description: "Listen closely. The truth is deafening.",
    imageUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1200&q=80",
    ctaText: "Watch Now",
    badgeText: "New Movie",
  },
  {
    id: "hb2",
    contentId: "s1",
    title: "Galactic Frontiers",
    description: "Explore the unknown.",
    imageUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&q=80",
    ctaText: "Watch Season 1",
    badgeText: "Premium Series",
  },
  {
    id: "hb3",
    contentId: "sp1",
    title: "Premier League Live",
    description: "Arsenal vs Manchester City",
    imageUrl:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=1200&q=80",
    ctaText: "Watch Live",
    badgeText: "Live Sport",
    isLive: true,
  },
];

export const MOCK_ROWS: ContentRow[] = [
  {
    id: "row0",
    title: "For You",
    items: MOCK_CONTENT_DB.filter((item) => item.isTrending).slice(0, 10),
  },
  {
    id: "row1",
    title: "Latest & Trending",
    items: MOCK_CONTENT_DB.filter((item) => item.isTrending).slice(0, 10),
  },
  {
    id: "row2",
    title: "New Releases",
    items: MOCK_CONTENT_DB.filter((item) => item.isNew).slice(0, 10),
  },
  {
    id: "row3",
    title: "Blockbuster Movies",
    items: MOCK_CONTENT_DB.filter(
      (item) => item.type === "movie" && item.imdbRating > 7.5,
    ).slice(0, 10),
  },
  {
    id: "row4",
    title: "Premium Content",
    items: MOCK_CONTENT_DB.filter((item) => item.isPremium).slice(0, 10),
  },
  {
    id: "row5",
    title: "Binge-Worthy Series",
    items: MOCK_CONTENT_DB.filter((item) => item.type === "series").slice(
      0,
      10,
    ),
  },
];

export const MOCK_USER_PROFILE: UserProfile = {
  id: "u1",
  name: "Dwaipayan Biswas",
  email: "dwaipayan@example.com",
  avatarUrl: "https://i.pravatar.cc/300",
  subscriptionPlan: "Premium",
  watchlist: [MOCK_CONTENT_DB[0], MOCK_CONTENT_DB[1]],
  recentlyWatched: [MOCK_CONTENT_DB[3]],
  memberSince: "2023-01-15T00:00:00Z",
};
