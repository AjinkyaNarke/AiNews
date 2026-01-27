import { useState } from 'react';
import { useArticles } from '../hooks/useArticles';
import { useTopics } from '../hooks/useTopics';
import { useInsights } from '../hooks/useInsights';
import { ArticleGrid } from '../components/articles/ArticleGrid';
import { ArticleSkeleton } from '../components/articles/ArticleSkeleton';
import { FeaturedArticle } from '../components/articles/FeaturedArticle';
import { Tabs } from '../components/ui/Tabs';
import { InsightsCard } from '../components/insights/InsightsCard';
import { SearchBar } from '../components/layout/SearchBar';
import type { Article } from '../types/article';

interface TabItem {
    name: string;
    count: number;
    articles: Article[];
}

export const Home = () => {
    const { data: articles, isLoading: loadingArticles, isError } = useArticles();
    const { data: topics } = useTopics();
    const { data: insights, isLoading: loadingInsights } = useInsights();

    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const allNewsTab: TabItem = { name: 'All News', count: articles?.length || 0, articles: articles || [] };

    const transformedTopics: TabItem[] = (topics || []).map(topic => ({
        name: topic.name,
        count: topic.count,
        articles: topic.articles
    }));

    const tabs: TabItem[] = [allNewsTab, ...transformedTopics];

    const currentTab = tabs[selectedTabIndex] || allNewsTab;
    const currentArticles = currentTab.articles;

    return (
        <div className="space-y-16 pb-12 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
            </div>

            {/* Hero Section */}
            <section className="text-center py-24 md:py-36 space-y-10 relative">

                <div className="space-y-6 max-w-5xl mx-auto px-4 relative z-10 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary-500/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-scale-in shadow-lg shadow-primary-500/10">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                        </span>
                        <span>Live AI Optimization Active • {loadingArticles ? 'Scanning...' : `${articles?.length || 0} Articles Loaded`}</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black font-display tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        The Future of AI, <br />
                        <span className="text-gradient animate-text-gradient bg-[length:200%_auto]">Delivered Daily.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-light">
                        Stay ahead with curated insights, real-time news, and <span className="text-primary-600 dark:text-primary-400 font-semibold">AI-powered summaries</span> of the most important developments.
                    </p>
                </div>

                <div className="max-w-xl mx-auto px-4 relative z-20 animate-slide-in">
                    <SearchBar />
                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-medium mr-1 py-1">Trending:</span>
                        {['ChatGPT-5', 'Gemini', 'Sora', 'Ethics', 'AGI'].map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full glass-card hover:border-primary-500 dark:hover:border-primary-500 cursor-pointer text-xs font-medium transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/10 active:scale-95">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Insights Section */}
            <section className="container mx-auto max-w-5xl px-4 relative z-10">
                <div className="glass-heavy rounded-3xl p-1 shadow-2xl shadow-primary-500/5 ring-1 ring-white/10">
                    <InsightsCard insights={insights || []} loading={loadingInsights} />
                </div>
            </section>

            {/* News Section */}
            <section className="space-y-8 container mx-auto px-4" id="news">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 sticky top-20 z-30 glass py-4 px-6 rounded-2xl shadow-sm transition-all duration-300">
                    <h2 className="text-2xl font-bold flex items-center gap-3 font-display">
                        <div className="w-2 h-8 bg-gradient-to-b from-primary-400 to-accent-600 rounded-full"></div>
                        Latest Updates
                    </h2>
                    <div className="w-full md:w-auto overflow-hidden">
                        <Tabs
                            categories={tabs.map(t => ({ name: t.name, count: t.count }))}
                            selectedIndex={selectedTabIndex}
                            onChange={setSelectedTabIndex}
                        />
                    </div>
                </div>

                {loadingArticles ? (
                    <div className="space-y-8">
                        <div className="w-full h-96 rounded-3xl bg-white/5 animate-pulse" />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map(i => <ArticleSkeleton key={i} />)}
                        </div>
                    </div>
                ) : isError ? (
                    <div className="text-center py-24 glass rounded-3xl border-red-100 dark:border-red-900/30">
                        <h3 className="text-lg font-bold text-red-800 dark:text-red-200">Failed to load articles</h3>
                        <p className="text-red-600 dark:text-red-300 mt-2">Please check your internet connection and API keys.</p>
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-12">
                        {currentArticles && currentArticles.length > 0 && (
                            <FeaturedArticle article={currentArticles[0]} />
                        )}

                        {currentArticles && currentArticles.length > 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xl font-bold font-display text-slate-800 dark:text-slate-100">More Trending Stories</h3>
                                    <div className="h-px flex-1 bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent"></div>
                                </div>
                                <ArticleGrid articles={currentArticles.slice(1)} />
                            </div>
                        )}

                        {(!currentArticles || currentArticles.length === 0) && (
                            <div className="text-center py-20">
                                <p className="text-slate-500">No articles found in this category.</p>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </div>
    );
};
