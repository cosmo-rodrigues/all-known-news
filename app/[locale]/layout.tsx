import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { Roboto } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SearchProvider, ThemeProvider } from '@/components/context';
import { Header } from '@/components/layout/header';
import { StoreProvider } from '@/components/context/store-context/store-context';
import { Hero } from '@/components/layout/hero';
import { Suspense } from 'react';

const roboto = Roboto({
  style: 'normal',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    redirect('/en');
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={roboto.className} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale}>
            <StoreProvider>
              <SearchProvider>
                <main className="max-w-4xl mx-auto p-4">
                  <Header locale={locale} />
                  <Suspense fallback="Loading...">
                    <Hero>{children}</Hero>
                  </Suspense>
                </main>
              </SearchProvider>
            </StoreProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
