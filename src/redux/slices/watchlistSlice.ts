import { ContentItem, MOCK_USER_PROFILE } from "@/services/mockData";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export interface WatchListState {
  items: ContentItem[];
}

const initialState: WatchListState = {
  items: [...MOCK_USER_PROFILE.watchlist],
};

const watchListSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addToWatchList(state, action) {
      const isExist = state.items.some((item) => item.id === action.payload.id);

      if (!isExist) {
        state.items.unshift(action.payload);
      }
    },

    removeFromWatchList(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearWatchList(state) {
      state.items = [];
    },

    toggleWatchList(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );

      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.unshift(action.payload);
      }
    },
  },
});

export const {
  addToWatchList,
  clearWatchList,
  removeFromWatchList,
  toggleWatchList,
} = watchListSlice.actions;

export default watchListSlice.reducer;

export const selectWatchlist = (state: RootState) => state.watchlist.items;

export const selectWatchlistCount = (state: RootState) =>
  state.watchlist.items.length;

//--> It is for the checkiing the item availble in the watchlist

export const selectInWatchlist = (id: string) => (state: RootState) =>
  state.watchlist.items.some((item) => item.id === id);
