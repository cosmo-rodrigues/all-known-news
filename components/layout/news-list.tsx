'use client';

import { NewsFactory } from '@/service';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FiltersComponent } from './filters-component';

// Define the article interface
interface Article {
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

// React component
export const NewsList: React.FC = () => {
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

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, q: e.target.value });
  };

  useEffect(() => {
    (async () => await loadArticles())();
  }, []);

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      {/* Loading State */}
      {loading && <p>Loading articles...</p>}

      {/* Article List */}
      <div>
        {articles.map((article, index) => {
          return (
            <div
              key={index}
              style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}
            >
              <h2>{article.title}</h2>
              <p>{article.description}</p>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  style={{ maxWidth: '100%' }}
                />
              )}
              <p>
                Published on:{' '}
                {new Date(article.publishedAt).toLocaleDateString()}
              </p>
              <p>Source: {article.source_name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
