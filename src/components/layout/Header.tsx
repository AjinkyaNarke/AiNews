import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ThemeToggle } from '../ui/ThemeToggle';
import { Menu, Newspaper } from 'lucide-react';
import { Sidebar } from './Sidebar';

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed z-50 transition-all duration-500 ease-in-out ${scrolled
                ? 'top-4 inset-x-4 max-w-7xl mx-auto rounded-[2rem] glass-heavy shadow-2xl border border-white/40 dark:border-white/10'
                : 'top-0 inset-x-0 bg-transparent border-transparent'
                }`}>
                <div className={`container mx-auto px-6 flex items-center justify-between gap-4 transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-primary-500 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                            <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-[14px] text-white shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300">
                                <Newspaper className="w-5 h-5" />
                            </div>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            AI News
                        </span>
                    </Link>

                    {/* Search - Desktop */}
                    <div className={`hidden md:block flex-1 max-w-md transition-all duration-500 ${scrolled ? 'opacity-0 pointer-events-none w-0 overflow-hidden' : 'opacity-100'}`}>
                        <SearchBar />
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {['Home', 'Countries', 'About'].map((item) => (
                            <Link key={item} to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="px-5 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-all">
                                {item}
                            </Link>
                        ))}
                        <div className="w-px h-5 bg-slate-200 dark:bg-slate-700 mx-2" />
                        <ThemeToggle />
                    </nav>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <ThemeToggle />
                        <button
                            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Mobile Search Bar - Collapsed integration */}
                <div className={`md:hidden px-4 transition-all duration-300 overflow-hidden ${scrolled ? 'h-0 pb-0 opacity-0' : 'h-auto pb-4 opacity-100'}`}>
                    <SearchBar />
                </div>
            </header>

            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
};
