// @ts-nocheck
import { Article } from '@/types';
import { GuardianClient, NewsApiClient, NewsDataIoClient } from '../articles';

export class NewsFactory {
  private newsApiClient: NewsApiClient;
  private newsDataIoClient: NewsDataIoClient;
  private guardianClient: GuardianClient;

  constructor(
    newsApiKey: string,
    newsDataIoKey: string,
    guardianApiKey: string
  ) {
    this.newsApiClient = new NewsApiClient(newsApiKey);
    this.newsDataIoClient = new NewsDataIoClient(newsDataIoKey);
    this.guardianClient = new GuardianClient(guardianApiKey);
  }

  async searchArticles(
    query: string,
    filters?: {
      // Global search parameters
      searchIn?: string;
      sources?: string;
      domains?: string;
      excludeDomains?: string;
      from?: string;
      to?: string;
      language?: string;
      sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
      pageSize?: number;
      page?: number;
      // Local search parameters
      country?: string;
      category?: string;
    }
  ) {
    const results = await Promise.allSettled([
      this.newsApiClient.searchEverything(query),
      this.newsDataIoClient.searchArticles(query),
      this.guardianClient.searchArticles(query),
    ]);

    // Process each result individually
    const normalizedResults: Article[] = [];

    // Helper function to normalize article formats
    const normalizeArticle = (source: string) => (article: any) => {
      const commonFields = {
        title: article.title || article.webTitle || '',
        description: article.description || '',
        url: article.url || article.link || article.webUrl || '',
        imageUrl:
          article.urlToImage || article.image_url || article.imageUrl || '',
        publishedAt:
          article.publishedAt ||
          article.pubDate ||
          article.webPublicationDate ||
          '',
        source:
          article.source?.name ||
          article.publisher ||
          article.sectionName ||
          source,
        source_name: article.source_name,
        source_url: article.source_url,
      };
      return commonFields;
    };

    // Check each API result
    results.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        const data = result.value;
        let articles: any[] = [];

        // Extract articles based on the API response structure
        switch (index) {
          case 0: // NewsAPI
            articles = data?.articles || [];
            break;
          case 1: // NewsData.io
            articles = data?.results || [];
            break;
          case 2: // Guardian
            articles = data?.response?.results || [];
            break;
        }

        // Normalize and add to results
        normalizedResults.push(
          ...articles.map(
            normalizeArticle(
              index === 0
                ? 'NewsAPI'
                : index === 1
                ? 'NewsData.io'
                : 'The Guardian'
            )
          )
        );
      } else {
        // Log the error but continue processing other results
        console.error(`API call ${index} failed:`, result.reason);
      }
    });

    return normalizedResults;
  }
}

export const getTodayISODate = () => {
  return new Date().toISOString().split('T')[0];
};

export const getDateSevenDaysAgo = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  return sevenDaysAgo.toISOString().split('T')[0];
};

export const currentLanguage = () => {
  const savedLanguage = localStorage.getItem('selectedLanguage');

  return savedLanguage;
};
