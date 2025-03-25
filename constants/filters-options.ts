import { useTranslations } from 'next-intl';

export const useTranslatedOptions = () => {
  const t = useTranslations('Filters');

  const countryOptions = [
    { label: t('country.us'), value: 'us' },
    { label: t('country.de'), value: 'de' },
    { label: t('country.br'), value: 'br' },
  ];

  const categoryOptions = [
    { label: t('category.entertainment'), value: 'entertainment' },
    { label: t('category.science'), value: 'science' },
    { label: t('category.sports'), value: 'sports' },
    { label: t('category.technology'), value: 'technology' },
    { label: t('category.top'), value: 'top' },
  ];

  const languageOptions = [
    { label: t('language.de'), value: 'de' },
    { label: t('language.en'), value: 'en' },
    { label: t('language.pt'), value: 'pt' },
  ];

  return { countryOptions, categoryOptions, languageOptions };
};
