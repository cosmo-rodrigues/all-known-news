import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './navigation';

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const messages = {
    ...(await import(`@/messages/${locale}/filters-component.json`)).default,
    ...(await import(`@/messages/${locale}/header-menu.json`)).default,
    ...(await import(`@/messages/${locale}/not-found.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
