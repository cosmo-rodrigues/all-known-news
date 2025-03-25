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
    filters: {
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
    const isLocalSearch = !!filters.country || !!filters.category;

    const [newsApiResults, newsDataIoResults, guardianResults] =
      await Promise.all([
        this.newsApiClient.searchEverything(query, {
          searchIn: filters.searchIn,
          sources: filters.sources,
          domains: filters.domains,
          excludeDomains: filters.excludeDomains,
          from: filters.from,
          to: filters.to,
          language: filters.language,
          sortBy: filters.sortBy,
          pageSize: filters.pageSize,
          page: filters.page,
        }),
        this.newsDataIoClient.searchArticles(query, {
          country: filters.country,
          language: filters.language,
          category: filters.category,
        }),
        this.guardianClient.searchArticles(query, {
          'from-date': filters.from,
          section: filters.category,
        }),
      ]);

    // Normalize responses into a unified format
    const normalizedResults = [
      ...newsApiResults.articles?.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name,
        source_name: article.source_name,
        source_url: article.source_url,
      })),
      ...newsDataIoResults.results?.map((article) => ({
        title: article.title,
        description: article.description,
        url: article.link,
        imageUrl: article.image_url,
        publishedAt: article.pubDate,
        source: article.publisher,
        source_name: article.source_name,
        source_url: article.source_url,
      })),
      ...guardianResults.response.results?.map((article) => ({
        title: article.webTitle,
        description: '', // The Guardian API does not provide a description
        url: article.webUrl,
        imageUrl: article.imageUrl,
        publishedAt: article.webPublicationDate,
        source: article.sectionName,
        source_name: article.source_name,
        source_url: article.source_url,
      })),
    ];

    return normalizedResults;
  }
}
