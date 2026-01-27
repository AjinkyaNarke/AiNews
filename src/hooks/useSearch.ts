import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { searchNews } from '../services/newsService';
import { useState } from 'react';

export const useSearch = () => {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);

    const { data: searchResults, isLoading: isSearching, error: searchError, isFetched } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: () => searchNews(debouncedQuery),
        enabled: debouncedQuery.length > 2,
        staleTime: 5 * 60 * 1000,
    });

    const clearSearch = () => setQuery('');

    return {
        query,
        setQuery,
        searchResults: searchResults || [],
        isSearching: isSearching && debouncedQuery.length > 2, // Only consider searching if query is valid
        isFetching: isSearching,
        searchError,
        clearSearch,
        hasSearched: isFetched && debouncedQuery.length > 2
    };
}
