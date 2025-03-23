'use client';

import { Card } from '@/components/ui/card';
import { FiltersComponent } from './filters-component';
import { usePathname } from '@/i18n/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { NewsFactory } from '@/service';

export interface Article {
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  source_name: string;
  source_url: string;
}

const newsFactory = new NewsFactory(
  process.env.NEXT_PUBLIC_NEWS_API_ORG_KEY,
  process.env.NEXT_PUBLIC_NEWS_DATA_IO_KEY,
  process.env.NEXT_PUBLIC_THE_GUARDIAN_KEY
);

export const Hero = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const currentPath =
    path.split('/')[1].length >= 3 ? path.split('/')[1] : 'home';

  const [articles, setArticles] = useState<Article[]>([]);
  const [filters, setFilters] = useState({
    q: 'AI',
    country: 'de',
    category: 'technology',
    language: 'en',
    page: 1,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch articles when the "Search" button is clicked
  const loadArticles = async () => {
    setLoading(true);
    try {
      // Fetch articles from all three APIs
      const data = await newsFactory.searchArticles(filters.q, filters);
      setArticles(data);
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => await loadArticles())();
  }, []);

  return (
    <main className="flex flex-col justify-between w-full pt-2">
      <Card className="w-full p-3">
        <FiltersComponent route={currentPath} />
      </Card>
      {children}
    </main>
  );
};
