'use client';

import { useRouter } from 'next/navigation';

export default function HomeButton({ locale }: { locale: string }) {
  const router = useRouter();

  const goToHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <button onClick={goToHome}>Home</button>
  );
}