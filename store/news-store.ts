import { create } from 'zustand';
import { NewsFactory } from '@/service';
import { Article } from '@/types';
import { ROUTES_NORMALIZER, RouteKey, NormalizedRoute } from '@/constants';

interface RouteFilters {
  q: string;
  country: string;
  category: string;
  language: string;
}

interface NewsStore {
  articles: Article[];
  loading: boolean;
  error: string | null;
  fetchArticles: (
    query: string,
    route: RouteKey | NormalizedRoute
  ) => Promise<void>;
  defaultFilters: {
    home: RouteFilters;
    local: RouteFilters;
    worldwide: RouteFilters;
  };
  getFiltersForRoute: (route: RouteKey | NormalizedRoute) => RouteFilters;
}

const newsFactory = new NewsFactory(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY!,
  process.env.NEXT_PUBLIC_NEWS_DATA_IO_KEY!,
  process.env.NEXT_PUBLIC_THE_GUARDIAN_KEY!
);

export const useNewsStore = create<NewsStore>((set, get) => ({
  articles: [],
  loading: false,
  error: null,
  defaultFilters: {
    home: {
      q: 'technology',
      country: 'us',
      category: 'technology',
      language: 'en',
    },
    local: {
      q: 'local news',
      country: 'de',
      category: 'general',
      language: 'de',
    },
    worldwide: {
      q: 'world news',
      country: '',
      category: 'world',
      language: 'en',
    },
  },

  fetchArticles: async (query: string, route: string) => {
    set({ loading: true, error: null });

    try {
      const normalizedRoute =
        ROUTES_NORMALIZER[route as RouteKey] || (route as NormalizedRoute);

      if (normalizedRoute.length < 3) return;

      const defaultFilters = get().defaultFilters[normalizedRoute];

      const data = await newsFactory.searchArticles(
        query ?? defaultFilters.q,
        route
      );

      set({ articles: data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch articles', loading: false });
      console.error('Error fetching articles:', error);
    } finally {
      set({ loading: false });
    }
  },

  getFiltersForRoute: (route) => {
    const normalizedRoute =
      ROUTES_NORMALIZER[route as RouteKey] || (route as NormalizedRoute);
    return get().defaultFilters[normalizedRoute];
  },
}));
