'use client';

import { NewsFactory } from '@/service';
import { Suspense, use, useEffect } from 'react';

export default async function Home() {
  const newsFactory = new NewsFactory(
    process.env.NEXT_PUBLIC_NEWS_API_ORG_BASE_URL,
    process.env.NEXT_PUBLIC_NEWS_DATA_IO_API_KEY,
    process.env.NEXT_PUBLIC_THE_GUARDIAN_API_KEY
  );

  const fetchAndDisplayArticles = async () => {
    const articles = await newsFactory.searchArticles('education', {
      country: 'br',
      date: '2025-03-20',
      category: 'education',
    });

    console.log(articles);
  };

  useEffect(() => {
    fetchAndDisplayArticles();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Start</h1>
      </Suspense>
    </>
  );
}
