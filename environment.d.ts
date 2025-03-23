import Next from 'next';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_NEWS_DATA_IO_API_KEY: string;
      NEXT_PUBLIC_NEWS_DATA_IO_API_BASE_URL: string;
      NEXT_PUBLIC_NEWS_API_ORG_BASE_URL: string;
      NEXT_PUBLIC_NEWS_API_ORG_KEY: string;
      NEXT_PUBLIC_THE_GUARDIAN_API_KEY: string;
      NEXT_PUBLIC_THE_GUARDIAN_API_BASE_URL: string;
    }
  }
}
