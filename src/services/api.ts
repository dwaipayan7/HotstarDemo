import {
  ApiResponse,
  ContentItem,
  HomeData,
  MOCK_CONTENT_DB,
  MOCK_HERO_BANNERS,
  MOCK_ROWS,
  MOCK_USER_PROFILE,
  SearchResult,
  UserProfile,
} from "./mockData";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const NETWORK_DELAY = 800;

export const ApiService = {
  async getHomeData(): Promise<ApiResponse<HomeData>> {
    await delay(NETWORK_DELAY);
    return {
      success: true,
      data: {
        heroBanners: MOCK_HERO_BANNERS,
        rows: MOCK_ROWS,
      },
    };
  },

  async getContentDetails(id: string): Promise<ApiResponse<ContentItem>> {
    await delay(NETWORK_DELAY);
    const item = MOCK_CONTENT_DB.find((content) => content.id === id);

    if (!item) {
      return {
        success: false,
        message: "Content not found",
        data: null as any,
      };
    }

    return {
      success: true,
      data: item,
    };
  },

  async searchContent(query: string): Promise<ApiResponse<SearchResult>> {
    await delay(NETWORK_DELAY);

    if (!query || query.trim().length === 0) {
      return {
        success: true,
        data: { query, items: [] },
      };
    }

    const lowerQuery = query.toLowerCase();
    const results = MOCK_CONTENT_DB.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
        item.genres.some((g) => g.name.toLowerCase().includes(lowerQuery)),
    );

    return {
      success: true,
      data: {
        query,
        items: results,
      },
    };
  },

  async getUserProfile(): Promise<ApiResponse<UserProfile>> {
    await delay(NETWORK_DELAY);
    return {
      success: true,
      data: MOCK_USER_PROFILE,
    };
  },
};
