import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Start</h1>
      </Suspense>
    </>
  );
}
