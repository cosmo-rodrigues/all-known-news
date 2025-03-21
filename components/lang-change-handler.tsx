'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const LangChangeHandler = () => {
  const { locale } = useParams();

  useEffect(() => {
    // Ensure locale is a string before setting the attribute
    if (locale && typeof locale === 'string') {
      document.documentElement.setAttribute('lang', locale);
    }
  }, [locale]);

  return null;
};

export default LangChangeHandler;