'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useLocale, useTranslations } from 'next-intl';
import { HTMLAttributes } from 'react';

interface NavProps extends HTMLAttributes<HTMLDivElement> {
  containerStyles: string;
  linkStyles: string;
  underlineStyles: string;

  links: {
    href: string;
    label: string;
  }[];
}

export const NavBar = ({
  containerStyles,
  linkStyles,
  underlineStyles,
  links,
}: NavProps) => {
  const t = useTranslations('Header');
  const localActive = useLocale();
  const path = usePathname();

  return (
    <nav className={cn(containerStyles)}>
      {links.map((link, index) => (
        <Link
          href={link.href}
          key={index}
          className={`capitalize ${linkStyles}`}
        >
          {link.href === path && (
            <motion.span
              animate={{ y: 0 }}
              className={underlineStyles}
              initial={{ y: '-100%' }}
              layoutId="underline"
              transition={{ type: 'tween' }}
            />
          )}
          {link.label}
        </Link>
      ))}
    </nav>
  );
};