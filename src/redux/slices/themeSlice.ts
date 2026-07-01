import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface ThemeState {
    isDark: boolean
}

const initialState : ThemeState = {

    isDark: true

}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark
        }
    }
});

export const {
    toggleTheme
} = themeSlice.actions;

export default themeSlice.reducer;

export const selectTheme = (state : RootState) => state.theme.isDark;