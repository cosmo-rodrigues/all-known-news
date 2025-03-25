'use client';

import { NewsCard } from './news-card';
import { useNewsStore } from '@/store/news-store';
import { Loading } from '../ui';
import { useTranslations } from 'next-intl';

export const NewsList = () => {
  const { articles, loading } = useNewsStore();
  const tNotFound = useTranslations('NotFound');

  if (loading) {
    return (
      <div className="mx-auto mt-5">
        <Loading />
      </div>
    );
  }

  if (!articles.length && !loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">{tNotFound('noArticlesFound')}</p>
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
