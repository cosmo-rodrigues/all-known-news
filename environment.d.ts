import Next from 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NEWS_DATA_IO_KEY: string;
      NEXT_PUBLIC_NEWS_DATA_IO_BASE_URL: string;
      NEXT_PUBLIC_NEWS_API_ORG_KEY: string;
      NEXT_PUBLIC_NEWS_API_ORG_BASE_URL: string;
      NEXT_PUBLIC_THE_GUARDIAN_KEY: string;
      NEXT_PUBLIC_THE_GUARDIAN_BASE_URL: string;
    }
  }
}
