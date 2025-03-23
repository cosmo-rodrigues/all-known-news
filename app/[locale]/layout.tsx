import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { Roboto } from 'next/font/google';
import { routing } from '@/i18n/routing';
import { SearchProvider, ThemeProvider } from '@/components/context';
import { Header } from '@/components/layout/header';

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
            <SearchProvider>
              <main className="max-w-4xl mx-auto p-4">
                <Header locale={locale} />
                {children}
              </main>
            </SearchProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
