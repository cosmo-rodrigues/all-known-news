import { NewsList } from '@/components/layout/news-list';
import { Suspense } from 'react';

export default function Worldwide() {
  return (
    <div className="flex flex-col justify-center items-center">
      <Suspense fallback={<>Loading...</>}>
        <NewsList />
      </Suspense>
    </div>
  );
}
