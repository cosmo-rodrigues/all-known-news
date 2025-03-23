import { GuardianClient, NewsApiClient, NewsDataIoClient } from '../articles';

export class NewsFactory {
  private newsApiClient: NewsApiClient;
  private newsDataIoClient: NewsDataIoClient;
  private guardianClient: GuardianClient;

  constructor(newsApiKey: string, newsDataIoKey: string, guardianApiKey: string) {
      this.newsApiClient = new NewsApiClient(newsApiKey);
      this.newsDataIoClient = new NewsDataIoClient(newsDataIoKey);
      this.guardianClient = new GuardianClient(guardianApiKey);
  }

  async searchArticles(query: string, filters: any) {
      const [newsApiResults, newsDataIoResults, guardianResults] = await Promise.all([
          this.newsApiClient.searchArticles(query, filters),
          this.newsDataIoClient.searchArticles(query, filters),
          this.guardianClient.searchArticles(query, filters),
      ]);

      // Normalize responses into a unified format
      const normalizedResults = [
          ...newsApiResults.articles.map((article) => ({
              title: article.title,
              description: article.description,
              url: article.url,
              imageUrl: article.urlToImage,
              publishedAt: article.publishedAt,
              source: article.source.name,
          })),
          ...newsDataIoResults.data.map((article) => ({
              title: article.title,
              description: article.description,
              url: article.link,
              imageUrl: article.image_url,
              publishedAt: article.pubDate,
              source: article.publisher,
          })),
          ...guardianResults.response.results.map((article) => ({
              title: article.webTitle,
              description: '', // The Guardian API does not provide a description
              url: article.webUrl,
              imageUrl: '', // The Guardian API does not provide an image URL
              publishedAt: article.webPublicationDate,
              source: article.sectionName,
          })),
      ];

      return normalizedResults;
  }
}