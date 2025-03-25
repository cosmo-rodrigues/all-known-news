'use client';

import { NewsCard } from './news-card';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useNewsStore } from '@/store/news-store';
import { NormalizedRoute, RouteKey } from '@/constants';

export const NewsList = () => {
  const pathname = usePathname();
  const currentRoute = pathname.split('/')[1] || 'home';
  const { articles, loading, fetchArticles } = useNewsStore();

  useEffect(() => {
    fetchArticles(currentRoute as RouteKey | NormalizedRoute);
  }, [currentRoute, fetchArticles]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-64 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">No articles found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {articles.map((article, index) => (
        <NewsCard key={`${article.source_name}-${index}`} article={article} />
      ))}
    </div>
  );
};
