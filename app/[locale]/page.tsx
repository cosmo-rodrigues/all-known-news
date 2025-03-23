import { NewsList } from '@/components/layout/news-list';
import { NewsFactory } from '@/service';
import { Suspense } from 'react';

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{/* <NewsList /> */}</Suspense>
    </>
  );
}
