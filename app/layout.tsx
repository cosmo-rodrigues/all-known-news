import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'All at Once - News',
  description:
    'News aggregator application where you can know everything about everywhere all at once',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return children;
}
