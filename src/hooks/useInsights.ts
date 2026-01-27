import { useQuery } from '@tanstack/react-query';
import { useArticles } from './useArticles';
import { getKeyInsights } from '../services/geminiService';

export const useInsights = () => {
    const { data: articles } = useArticles();

    return useQuery({
        queryKey: ['insights', articles?.length],
        queryFn: () => {
            if (!articles || articles.length === 0) return [];
            const titles = articles.map(a => a.title);
            return getKeyInsights(titles);
        },
        enabled: !!articles && articles.length > 0,
        staleTime: Infinity,
    });
};
