import { api } from './api';

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  type?: 'quiz' | 'proof' | 'user' | 'achievement';
}

export interface SearchResult {
  id: string;
  type: 'quiz' | 'proof' | 'user' | 'achievement';
  title: string;
  description: string;
  url: string;
  createdAt: string;
  relevance: number;
  metadata: Record<string, any>;
}

export interface SearchResponse {
  results: SearchResult[];
  totalResults: number;
  page: number;
  totalPages: number;
  suggestions?: string[];
  facets?: {
    categories: Array<{ name: string; count: number }>;
    difficulties: Array<{ name: string; count: number }>;
    types: Array<{ name: string; count: number }>;
  };
}

class SearchService {
  private searchHistory: string[] = [];
  private savedSearches: Array<{ query: string; filters: SearchFilters; name: string }> = [];

  async search(
    query: string,
    filters: SearchFilters = {},
    page: number = 1,
    limit: number = 20
  ): Promise<SearchResponse> {
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
        ...Object.fromEntries(
          Object.entries(filters).filter(([, value]) => value !== undefined)
        )
      });

      const response = await api.get(`/search?${params}`);
      
      // Add to search history
      this.addToHistory(query);
      
      return response.data;
    } catch (error: any) {
      console.error('Search failed:', error);
      throw new Error(error.response?.data?.message || 'Search failed');
    }
  }

  async searchQuizzes(
    query: string,
    filters: Omit<SearchFilters, 'type'> = {},
    page: number = 1
  ): Promise<SearchResponse> {
    return this.search(query, { ...filters, type: 'quiz' }, page);
  }

  async searchProofs(
    query: string,
    filters: Omit<SearchFilters, 'type'> = {},
    page: number = 1
  ): Promise<SearchResponse> {
    return this.search(query, { ...filters, type: 'proof' }, page);
  }

  async searchUsers(
    query: string,
    filters: Omit<SearchFilters, 'type'> = {},
    page: number = 1
  ): Promise<SearchResponse> {
    return this.search(query, { ...filters, type: 'user' }, page);
  }

  async getSuggestions(query: string): Promise<string[]> {
    if (query.length < 2) return [];

    try {
      const response = await api.get(`/search/suggestions?q=${encodeURIComponent(query)}`);
      return response.data.suggestions || [];
    } catch (error) {
      console.error('Failed to get search suggestions:', error);
      return [];
    }
  }

  async getPopularSearches(): Promise<string[]> {
    try {
      const response = await api.get('/search/popular');
      return response.data.searches || [];
    } catch (error) {
      console.error('Failed to get popular searches:', error);
      return [];
    }
  }

  // Search history management
  addToHistory(query: string): void {
    if (!query.trim() || this.searchHistory.includes(query)) return;
    
    this.searchHistory.unshift(query);
    
    // Keep only last 50 searches
    if (this.searchHistory.length > 50) {
      this.searchHistory = this.searchHistory.slice(0, 50);
    }
    
    this.saveHistoryToStorage();
  }

  getHistory(): string[] {
    return [...this.searchHistory];
  }

  clearHistory(): void {
    this.searchHistory = [];
    this.saveHistoryToStorage();
  }

  removeFromHistory(query: string): void {
    this.searchHistory = this.searchHistory.filter(q => q !== query);
    this.saveHistoryToStorage();
  }

  private saveHistoryToStorage(): void {
    try {
      localStorage.setItem('connectsphere_search_history', JSON.stringify(this.searchHistory));
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  }

  private loadHistoryFromStorage(): void {
    try {
      const stored = localStorage.getItem('connectsphere_search_history');
      if (stored) {
        this.searchHistory = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
      this.searchHistory = [];
    }
  }

  // Saved searches management
  saveSearch(query: string, filters: SearchFilters, name: string): void {
    const savedSearch = { query, filters, name };
    
    // Remove if already exists
    this.savedSearches = this.savedSearches.filter(s => s.name !== name);
    
    // Add to beginning
    this.savedSearches.unshift(savedSearch);
    
    // Keep only 20 saved searches
    if (this.savedSearches.length > 20) {
      this.savedSearches = this.savedSearches.slice(0, 20);
    }
    
    this.saveSavedSearchesToStorage();
  }

  getSavedSearches(): Array<{ query: string; filters: SearchFilters; name: string }> {
    return [...this.savedSearches];
  }

  removeSavedSearch(name: string): void {
    this.savedSearches = this.savedSearches.filter(s => s.name !== name);
    this.saveSavedSearchesToStorage();
  }

  private saveSavedSearchesToStorage(): void {
    try {
      localStorage.setItem('connectsphere_saved_searches', JSON.stringify(this.savedSearches));
    } catch (error) {
      console.error('Failed to save saved searches:', error);
    }
  }

  private loadSavedSearchesFromStorage(): void {
    try {
      const stored = localStorage.getItem('connectsphere_saved_searches');
      if (stored) {
        this.savedSearches = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load saved searches:', error);
      this.savedSearches = [];
    }
  }

  // Advanced search utilities
  buildSearchUrl(query: string, filters: SearchFilters): string {
    const params = new URLSearchParams({ q: query });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.set(key, value);
      }
    });
    
    return `/search?${params.toString()}`;
  }

  parseSearchUrl(url: string): { query: string; filters: SearchFilters } {
    const urlObj = new URL(url, window.location.origin);
    const params = urlObj.searchParams;
    
    const query = params.get('q') || '';
    const filters: SearchFilters = {};
    
    const filterKeys: (keyof SearchFilters)[] = [
      'category', 'difficulty', 'status', 'dateFrom', 'dateTo', 'type'
    ];
    
    filterKeys.forEach(key => {
      const value = params.get(key);
      if (value) {
        filters[key] = value as any;
      }
    });
    
    return { query, filters };
  }

  // Initialize service
  init(): void {
    this.loadHistoryFromStorage();
    this.loadSavedSearchesFromStorage();
  }
}

// Export singleton instance
export const searchService = new SearchService();

// Initialize on module load
searchService.init();
