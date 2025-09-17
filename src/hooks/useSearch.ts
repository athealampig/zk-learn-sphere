import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDebounce } from './useDebounce';
import { searchService, SearchFilters, SearchResult, SearchResponse } from '@/services/search';
import { useQuery } from '@tanstack/react-query';

export interface UseSearchOptions {
  initialQuery?: string;
  initialFilters?: SearchFilters;
  debounceMs?: number;
  enableHistory?: boolean;
  autoSearch?: boolean;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const {
    initialQuery = '',
    initialFilters = {},
    debounceMs = 300,
    enableHistory = true,
    autoSearch = true
  } = options;

  // State
  const [query, setQuery] = useState(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [savedSearches, setSavedSearches] = useState<Array<{ query: string; filters: SearchFilters; name: string }>>([]);
  const [page, setPage] = useState(1);
  
  // Debounced query for API calls
  const debouncedQuery = useDebounce(query, debounceMs);

  // Load search history and saved searches
  useEffect(() => {
    if (enableHistory) {
      setHistory(searchService.getHistory());
      setSavedSearches(searchService.getSavedSearches());
    }
  }, [enableHistory]);

  // Main search query
  const searchQuery = useQuery({
    queryKey: ['search', debouncedQuery, filters, page],
    queryFn: () => searchService.search(debouncedQuery, filters, page),
    enabled: autoSearch && debouncedQuery.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2
  });

  // Suggestions query
  const suggestionsQuery = useQuery({
    queryKey: ['search-suggestions', query],
    queryFn: () => searchService.getSuggestions(query),
    enabled: query.length >= 2 && showSuggestions,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1
  });

  // Update suggestions when query changes
  useEffect(() => {
    if (suggestionsQuery.data) {
      setSuggestions(suggestionsQuery.data);
    }
  }, [suggestionsQuery.data]);

  // Search functions
  const performSearch = useCallback(async (searchQuery?: string, searchFilters?: SearchFilters) => {
    const q = searchQuery || query;
    const f = searchFilters || filters;
    
    if (q.length < 2) return null;
    
    try {
      const result = await searchService.search(q, f, 1);
      setPage(1); // Reset to first page
      return result;
    } catch (error) {
      console.error('Search failed:', error);
      throw error;
    }
  }, [query, filters]);

  const searchQuizzes = useCallback(async (searchQuery?: string) => {
    const q = searchQuery || query;
    return await searchService.searchQuizzes(q, filters, page);
  }, [query, filters, page]);

  const searchProofs = useCallback(async (searchQuery?: string) => {
    const q = searchQuery || query;
    return await searchService.searchProofs(q, filters, page);
  }, [query, filters, page]);

  const searchUsers = useCallback(async (searchQuery?: string) => {
    const q = searchQuery || query;
    return await searchService.searchUsers(q, filters, page);
  }, [query, filters, page]);

  // Update functions
  const updateQuery = useCallback((newQuery: string) => {
    setQuery(newQuery);
    setPage(1); // Reset pagination
  }, []);

  const updateFilters = useCallback((newFilters: SearchFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset pagination
  }, []);

  const updateFilter = useCallback((key: keyof SearchFilters, value: string | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setPage(1); // Reset pagination
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
    setPage(1);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setFilters({});
    setPage(1);
    setSuggestions([]);
    setShowSuggestions(false);
  }, []);

  // Pagination
  const nextPage = useCallback(() => {
    const totalPages = searchQuery.data?.totalPages || 1;
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  }, [page, searchQuery.data?.totalPages]);

  const previousPage = useCallback(() => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }, [page]);

  const goToPage = useCallback((pageNumber: number) => {
    const totalPages = searchQuery.data?.totalPages || 1;
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }, [searchQuery.data?.totalPages]);

  // Suggestions
  const showSuggestionsDropdown = useCallback(() => {
    setShowSuggestions(true);
  }, []);

  const hideSuggestionsDropdown = useCallback(() => {
    setShowSuggestions(false);
  }, []);

  const selectSuggestion = useCallback((suggestion: string) => {
    setQuery(suggestion);
    setShowSuggestions(false);
    setPage(1);
  }, []);

  // History management
  const selectFromHistory = useCallback((historyQuery: string) => {
    setQuery(historyQuery);
    setShowSuggestions(false);
    setPage(1);
  }, []);

  const removeFromHistory = useCallback((historyQuery: string) => {
    searchService.removeFromHistory(historyQuery);
    setHistory(searchService.getHistory());
  }, []);

  const clearHistory = useCallback(() => {
    searchService.clearHistory();
    setHistory([]);
  }, []);

  // Saved searches
  const saveCurrentSearch = useCallback((name: string) => {
    if (query.trim()) {
      searchService.saveSearch(query, filters, name);
      setSavedSearches(searchService.getSavedSearches());
    }
  }, [query, filters]);

  const loadSavedSearch = useCallback((savedSearch: { query: string; filters: SearchFilters; name: string }) => {
    setQuery(savedSearch.query);
    setFilters(savedSearch.filters);
    setPage(1);
  }, []);

  const removeSavedSearch = useCallback((name: string) => {
    searchService.removeSavedSearch(name);
    setSavedSearches(searchService.getSavedSearches());
  }, []);

  // URL management
  const getSearchUrl = useCallback(() => {
    return searchService.buildSearchUrl(query, filters);
  }, [query, filters]);

  const loadFromUrl = useCallback((url: string) => {
    const { query: urlQuery, filters: urlFilters } = searchService.parseSearchUrl(url);
    setQuery(urlQuery);
    setFilters(urlFilters);
    setPage(1);
  }, []);

  // Computed values
  const hasQuery = query.length >= 2;
  const hasResults = searchQuery.data && searchQuery.data.results.length > 0;
  const hasFilters = Object.values(filters).some(value => value !== undefined && value !== '');
  const canGoNext = page < (searchQuery.data?.totalPages || 1);
  const canGoPrevious = page > 1;
  
  const filteredSuggestions = useMemo(() => {
    if (!query) return [];
    return suggestions.filter(s => 
      s.toLowerCase().includes(query.toLowerCase()) && s !== query
    );
  }, [suggestions, query]);

  const filteredHistory = useMemo(() => {
    if (!query) return history.slice(0, 10);
    return history.filter(h => 
      h.toLowerCase().includes(query.toLowerCase()) && h !== query
    ).slice(0, 10);
  }, [history, query]);

  return {
    // State
    query,
    filters,
    page,
    suggestions: filteredSuggestions,
    showSuggestions,
    history: filteredHistory,
    savedSearches,

    // Query results
    results: searchQuery.data?.results || [],
    totalResults: searchQuery.data?.totalResults || 0,
    totalPages: searchQuery.data?.totalPages || 1,
    facets: searchQuery.data?.facets,
    isLoading: searchQuery.isLoading,
    isError: searchQuery.isError,
    error: searchQuery.error,

    // Search actions
    performSearch,
    searchQuizzes,
    searchProofs,
    searchUsers,

    // Update actions
    updateQuery,
    updateFilters,
    updateFilter,
    clearFilters,
    clearSearch,

    // Pagination
    nextPage,
    previousPage,
    goToPage,
    canGoNext,
    canGoPrevious,

    // Suggestions
    showSuggestionsDropdown,
    hideSuggestionsDropdown,
    selectSuggestion,

    // History
    selectFromHistory,
    removeFromHistory,
    clearHistory,

    // Saved searches
    saveCurrentSearch,
    loadSavedSearch,
    removeSavedSearch,

    // URL management
    getSearchUrl,
    loadFromUrl,

    // Computed values
    hasQuery,
    hasResults,
    hasFilters,

    // Raw query hooks for advanced usage
    searchQuery,
    suggestionsQuery
  };
};