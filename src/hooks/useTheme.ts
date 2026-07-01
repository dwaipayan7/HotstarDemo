import { getThemeColors } from '@/constants/colors';
import { useAppDispatch, useAppSelector } from '@/redux/store/store';
import { selectTheme, toggleTheme } from '@/redux/slices/themeSlice';

const useTheme = () => {
    const isDark = useAppSelector(selectTheme);
    const dispatch = useAppDispatch();

    const theme = getThemeColors(isDark);

    const toggle = () => dispatch(toggleTheme());

    return { theme, isDark, toggle };
};

export default useTheme;
