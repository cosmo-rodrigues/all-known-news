import {
  GuardianArticle,
  GuardianResponse,
  NewsApiArticle,
  NewsApiResponse,
  NewsDataIoArticle,
  NewsDataIoResponse,
} from '@/types';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const hasData = (
  data: NewsDataIoArticle[] | NewsApiArticle[] | GuardianArticle[]
) => {
  return data.length > 0;
};

export class NewsApiClient {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: 'https://newsapi.org/v2',
    });
  }

  async searchEverything(
    query: string,
    filters: {
      searchIn?: string; // title, description, content
      sources?: string; // comma-separated source IDs
      domains?: string; // comma-separated domains
      excludeDomains?: string; // comma-separated domains
      from?: string; // ISO 8601 date
      to?: string; // ISO 8601 date
      language?: string; // 2-letter ISO-639-1 code
      sortBy?: 'relevancy' | 'popularity' | 'publishedAt'; // sorting option
      pageSize?: number; // number of results per page
      page?: number; // page number
    }
  ): Promise<NewsApiResponse> {
    const response: AxiosResponse<NewsApiResponse> =
      await this.axiosInstance.get('/everything', {
        params: {
          q: query,
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
          apiKey: this.apiKey,
        },
      });

    if (hasData(response?.data.articles)) {
      response.data.articles = response.data.articles.map((item) => {
        return {
          ...item,
          source_name: item.source.name,
          source_url: item.url,
        };
      });
    }

    return response.data;
  }
}

export class NewsDataIoClient {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: 'https://newsdata.io/api/1',
    });
  }

  async searchArticles(
    query: string,
    filters: any
  ): Promise<NewsDataIoResponse> {
    const response: AxiosResponse<NewsDataIoResponse> =
      await this.axiosInstance.get('/news', {
        params: {
          q: query,
          country: filters.country,
          language: filters.language,
          category: filters.category,
          apikey: this.apiKey,
          ...filters,
        },
      });

    return response.data;
  }
}

export class GuardianClient {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: 'https://content.guardianapis.com',
    });
  }

  async searchArticles(query: string, filters: any): Promise<GuardianResponse> {
    const response: AxiosResponse<GuardianResponse> =
      await this.axiosInstance.get('/search', {
        params: {
          q: query,
          'from-date': filters.date,
          section: filters.category,
          'api-key': this.apiKey,
          ...filters,
          'show-elements': 'image',
        },
      });

    if (hasData(response?.data?.response?.results)) {
      response.data.response.results = response.data.response.results.map(
        (item) => {
          // Extract the image URL from the elements array
          const imageElement = item.elements?.find(
            (element) => element.relation === 'main' && element.type === 'image'
          );

          const imageUrl = imageElement?.assets?.[0]?.file || null; // Use the first image asset

          return {
            ...item,
            source_name: 'The Guardian',
            source_url: item.webUrl,
            imageUrl, // Add the image URL to the article
          };
        }
      );
    }

    return response.data;
  }
}
