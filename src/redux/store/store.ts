import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import AuthSlice from "../slices/AuthSlice
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import snackbarReducer from "../slices/snackbarSlice";
import watchListSlice from "../slices/watchlistSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistWatchListConfig = {
  key: "watchlist",
  storage: AsyncStorage,
};

const persistedSnackBarSlice = persistReducer(persistConfig, snackbarReducer);
const persistedWatchlistSlice = persistReducer(
  persistWatchListConfig,
  watchListSlice,
);

export const store = configureStore({
  reducer: {
    snackbar: persistedSnackBarSlice,
    // auth: persistedAuthSlice,
    watchlist: persistedWatchlistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
