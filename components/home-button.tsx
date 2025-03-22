'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui';

export default function HomeButton({ locale }: { locale: string }) {
  const router = useRouter();

  const goToHome = () => {
    router.push(`/${locale}`);
  };

  return (
    <Button variant="outline" onClick={goToHome}>
      Back to home
    </Button>
  );
}