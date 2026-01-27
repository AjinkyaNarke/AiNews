import { useQuery } from '@tanstack/react-query';
import { useArticles } from './useArticles';
import { categorizeArticles } from '../services/geminiService';
import type { TopicCategory } from '../types/topic';

export const useTopics = () => {
    const { data: articles, isSuccess } = useArticles();

    return useQuery({
        queryKey: ['topics', articles?.length],
        queryFn: async () => {
            if (!articles || articles.length === 0) return [];

            // Limit to first 20 or so for categorization to save tokens/time if needed? 
            // Prompt says "Analyze these 100 AI news article titles". I'll pass all.
            const response = await categorizeArticles(articles);

            const topics: TopicCategory[] = response.topics.map((t, index) => ({
                name: t.name,
                articles: t.articleIndices ? t.articleIndices.map(idx => articles[idx]).filter(Boolean) : [],
                icon: 'Hash',
                color: ['blue', 'green', 'purple', 'orange', 'red'][index % 5],
                count: t.articleIndices ? t.articleIndices.length : 0
            }));
            return topics;
        },
        enabled: isSuccess && !!articles && articles.length > 0,
        staleTime: Infinity,
        retry: 1
    });
};
