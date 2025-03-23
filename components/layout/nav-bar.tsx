'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
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
  const path = usePathname();

  const selectedLink = (href: string) => {
    const currentPath = path.split('/').slice(-1)[0];
    const selectedLink = href.split('/').slice(-1)[0];

    return currentPath === selectedLink;
  };

  return (
    <nav className={cn(containerStyles)}>
      {links.map((link, index) => {
        return (
          <Link
            href={link.href}
            key={index}
            className={`capitalize ${linkStyles}`}
          >
            {selectedLink(link.href) && (
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
        );
      })}
    </nav>
  );
};
