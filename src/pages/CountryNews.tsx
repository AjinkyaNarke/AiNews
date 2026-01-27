import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchNewsByCountry } from '../services/newsService';
import { ArticleGrid } from '../components/articles/ArticleGrid';
import { countryMap } from '../constants/countries';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CountryNews = () => {
    const { code } = useParams<{ code: string }>();
    const navigate = useNavigate();

    // Default to US if invalid
    const countryKey = (code?.toUpperCase() || 'US') as keyof typeof countryMap;
    const country = countryMap[countryKey] || countryMap['US'];

    const { data: articles, isLoading, error } = useQuery({
        queryKey: ['news', 'country', countryKey],
        // Note: fetchNewsByCountry needs to be exported from newsService
        queryFn: () => fetchNewsByCountry(countryKey, country.name),
        staleTime: 1000 * 60 * 5, // 5 minutes
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [code]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">
                    Could not load news for {country.name}
                </h2>
                <button
                    onClick={() => navigate('/countries')}
                    className="px-6 py-2 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors"
                >
                    Try Another Country
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center mb-12 relative">
                <button
                    onClick={() => navigate('/countries')}
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-primary-500 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>

                <div className="w-20 h-14 overflow-hidden rounded-lg shadow-lg mb-4 ring-1 ring-black/10">
                    <img
                        src={country.flag}
                        alt={country.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/flag/us.png'; }}
                    />
                </div>

                <h1 className="text-3xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-2">
                    AI News from {country.name}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-lg">
                    Latest artificial intelligence updates and breakthroughs • <span className="text-primary-500 font-semibold">{articles ? `${articles.length} Stories Found` : '...'}</span>
                </p>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-10 h-10 animate-spin text-primary-500 mb-4" />
                    <p className="text-slate-500 animate-pulse">Scanning local sources...</p>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {articles && articles.length > 0 ? (
                        <ArticleGrid articles={articles} />
                    ) : (
                        <div className="text-center py-20 glass-card rounded-[2rem]">
                            <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
                                No specific AI news found for {country.name} right now.
                            </p>
                            <p className="text-slate-500">
                                Try checking the global feed or come back later.
                            </p>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default CountryNews;
