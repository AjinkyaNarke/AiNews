import { useQuery } from '@tanstack/react-query';
import { fetchAINews } from '../services/newsService';

export const useArticles = () => {
    return useQuery({
        queryKey: ['articles'],
        queryFn: () => fetchAINews(100),
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: true,
    });
};
