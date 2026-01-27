import { useTheme } from '../../hooks/useTheme';
import { Sun, Moon, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="inline-flex items-center p-1 bg-gray-200 dark:bg-gray-700 rounded-full">
            {(['light', 'system', 'dark'] as const).map((t) => {
                const isActive = theme === t;
                return (
                    <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`relative flex items-center justify-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors z-10 ${isActive ? 'text-gray-900 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'
                            }`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="theme-bg"
                                className="absolute inset-0 bg-white dark:bg-gray-600 rounded-full shadow-sm"
                                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                        <span className="relative flex items-center gap-2 z-10">
                            {t === 'light' && <Sun className="w-4 h-4" />}
                            {t === 'system' && <Monitor className="w-4 h-4" />}
                            {t === 'dark' && <Moon className="w-4 h-4" />}
                            <span className="hidden md:inline capitalize">{t}</span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
};
