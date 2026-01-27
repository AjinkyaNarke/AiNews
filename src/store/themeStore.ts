import { create } from 'zustand';

interface ThemeState {
    theme: 'light' | 'dark' | 'system';
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    resolvedTheme: 'light' | 'dark';
}

const getSystemTheme = (): 'light' | 'dark' =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

export const useThemeStore = create<ThemeState>((set) => {
    const storedTheme = (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system';

    // Apply initial theme
    const root = window.document.documentElement;
    const initialResolved = storedTheme === 'system' ? getSystemTheme() : storedTheme;
    root.classList.remove('light', 'dark');
    root.classList.add(initialResolved);

    return {
        theme: storedTheme,
        resolvedTheme: initialResolved,
        setTheme: (theme) => {
            localStorage.setItem('theme', theme);
            const resolved = theme === 'system' ? getSystemTheme() : theme;

            const root = window.document.documentElement;
            root.classList.remove('light', 'dark');
            root.classList.add(resolved);

            set({ theme, resolvedTheme: resolved });
        },
    };
});
