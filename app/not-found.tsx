// NotFound.js
import HomeButton from '@/components/home-button';
import { getTranslations, getLocale } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('NotFound');
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <div>
          <h1>{t('title')}</h1>
          <div>
            <p>Go to home</p>
            <HomeButton locale={locale} />
          </div>
        </div>
      </body>
    </html>
  );
}