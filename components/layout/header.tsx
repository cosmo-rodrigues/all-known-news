'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useLocale, useTranslations } from 'next-intl';

import { Menu, Moon, Search, Sun } from 'lucide-react';

import { cn } from '@/lib/utils';

import * as Shad from '@/components/ui';
import LocalSwitcher from '../local-switcher';
import { HTMLAttributes } from 'react';
import { NavBar } from './nav-bar';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  locale: string;
}

export const Header = ({ className, locale }: HeaderProps) => {
  const { theme, setTheme } = useTheme();
  const tHeader = useTranslations('Header');
  const localActive = useLocale();

  const routes = [
    {
      href: `/${localActive}`,
      label: tHeader('routes.home'),
    },
    {
      href: `/${localActive}/worldwide`,
      label: tHeader('routes.worldwide'),
    },
    {
      href: `/${localActive}/local`,
      label: tHeader('routes.local'),
    },
  ];

  return (
    <header
      className={cn('sm:flex sm:justify-between py-3 px-0 border-b', className)}
    >
      <div className="relative flex h-16 items-center justify-between w-full">
        <div className="flex items-center">
          <Shad.Sheet>
            <Shad.SheetTrigger>
              <Menu className="h6 lg:hidden w-6" />
            </Shad.SheetTrigger>
            <Shad.SheetHeader>
              <Shad.SheetTitle hidden>Menu</Shad.SheetTitle>
            </Shad.SheetHeader>

            <Shad.SheetContent
              side="left"
              className="flex flex-col items-center justify-center w-[250px] sm:w-[400px]"
            >
              <nav className="flex flex-col items-center justify-center gap-4">
                {routes.map((route, i) => (
                  <Shad.SheetClose asChild>
                    <Shad.Button asChild key={i} variant="ghost">
                      <Link
                        className="block px-2 py-1 uppercase"
                        href={route.href}
                      >
                        {route.label}
                      </Link>
                    </Shad.Button>
                  </Shad.SheetClose>
                ))}
              </nav>
            </Shad.SheetContent>
          </Shad.Sheet>
          <Link
            href="/pt"
            className="ml-3 hidden sm:flex items-center justify-between"
          >
            <p className="text-primary text-2xl font-black">ALL </p>
            <p className="text-primary text-3xl font-black">AT</p>
            <p className="text-primary text-2xl font-black">ONCE</p>
          </Link>
        </div>

        <NavBar
          containerStyles="hidden lg:flex gap-x-8 items-center"
          linkStyles="relative hover:text-primary transition-all"
          underlineStyles="absolute left-0 top-full h-[2px] bg-primary w-full"
          links={routes}
        />

        <div className="flex items-center text-slate-500">
          <Shad.Button
            aria-label="Toggle theme"
            className="mr-2 rounded-full"
            size="icon"
            variant="ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{tHeader('toggleTheme')}</span>
          </Shad.Button>

          <LocalSwitcher />
        </div>
      </div>
    </header>
  );
};
