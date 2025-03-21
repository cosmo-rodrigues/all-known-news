import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export default async function Home() {
  const t = await getTranslations('Nav');
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>{t('home')}</h1>
      </Suspense>
    </>
  );
}
