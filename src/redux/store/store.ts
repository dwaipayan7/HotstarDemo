import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import AuthSlice from "../slices/AuthSlice
import snackbarReducer from "../slices/snackbarSlice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistConfigAuth = {
  key: "auth",
  storage: AsyncStorage,
};

const persistedSnackBarSlice = persistReducer(persistConfig, snackbarReducer);
// const persistedAuthSlice = persistReducer(persistConfigAuth);

export const store = configureStore({
  reducer: {
    snackbar: persistedSnackBarSlice,
    // auth: persistedAuthSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
