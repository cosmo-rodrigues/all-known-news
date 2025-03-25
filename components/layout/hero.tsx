'use client';

import { Card } from '@/components/ui/card';
import { FiltersComponent } from './filters-component';
import { usePathname } from '@/i18n/navigation';
import { ReactNode } from 'react';

export const Hero = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const currentPath =
    path.split('/')[1].length >= 3 ? path.split('/')[1] : 'home';

  console.log('currentPath: ', currentPath);

  return (
    <main className="flex flex-col justify-between w-full pt-2">
      <Card className="w-full p-3 mb-3">
        <FiltersComponent route={currentPath} />
      </Card>
      {children}
    </main>
  );
};
