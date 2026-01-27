import { useThemeStore } from '../store/themeStore';

export const useTheme = () => {
    const { theme, resolvedTheme, setTheme } = useThemeStore();

    const toggleTheme = () => {
        // Cycle: light -> dark -> system -> light
        if (theme === 'light') setTheme('dark');
        else if (theme === 'dark') setTheme('system');
        else setTheme('light');
    };

    return { theme, resolvedTheme, setTheme, toggleTheme };
};
