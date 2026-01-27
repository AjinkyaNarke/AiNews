import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { searchNews } from '../services/newsService';
import { ArticleGrid } from '../components/articles/ArticleGrid';
import { ArticleSkeleton } from '../components/articles/ArticleSkeleton';
import { SearchBar } from '../components/layout/SearchBar';
import { Search as SearchIcon, Filter } from 'lucide-react';

export const Search = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';

    const { data: articles, isLoading, isError } = useQuery({
        queryKey: ['search-page', query],
        queryFn: () => searchNews(query),
        enabled: query.length > 0,
        staleTime: 5 * 60 * 1000
    });

    return (
        <div className="space-y-8 min-h-[60vh]">
            <div className="max-w-2xl mx-auto py-8 space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Search AI News</h1>
                    <p className="text-gray-500 dark:text-gray-400">Discover articles on specific topics, companies, or technologies</p>
                </div>

                <SearchBar />

                {query && !isLoading && (
                    <div className="flex items-center justify-between pt-4 border-b border-gray-200 dark:border-gray-800 pb-2">
                        <p className="text-gray-500">
                            Found {articles?.length || 0} results for <span className="font-semibold text-gray-900 dark:text-gray-100">"{query}"</span>
                        </p>
                        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                            <Filter className="w-4 h-4" />
                            <span>Filter</span>
                        </button>
                    </div>
                )}
            </div>

            {!query ? (
                <div className="text-center py-24 opacity-40 flex flex-col items-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-4">
                        <SearchIcon className="w-12 h-12 text-gray-400" />
                    </div>
                    <p className="text-xl font-medium">Start your search above</p>
                    <div className="mt-4 flex gap-2">
                        <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">Try: "Deep learning"</span>
                        <span className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">"NVIDIA"</span>
                    </div>
                </div>
            ) : isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => <ArticleSkeleton key={i} />)}
                </div>
            ) : isError ? (
                <div className="text-center py-20 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <p className="text-red-600 dark:text-red-400 font-medium">Error searching news. Please try again.</p>
                </div>
            ) : articles?.length === 0 ? (
                <div className="text-center py-20 opacity-60">
                    <p className="text-lg">No articles found matching your criteria.</p>
                    <p className="text-sm mt-2">Try using broader keywords.</p>
                </div>
            ) : (
                <ArticleGrid articles={articles || []} />
            )}
        </div>
    );
};
