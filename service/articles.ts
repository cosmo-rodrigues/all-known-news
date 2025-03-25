// @ts-nocheck
import { GuardianResponse, NewsApiResponse, NewsDataIoResponse } from '@/types';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class NewsApiClient {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: 'https://newsapi.org/v2',
      timeout: 5000, // 5 second timeout
    });
  }

  async searchEverything(
    query: string,
    filters: {
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
    }
  ): Promise<NewsApiResponse> {
    const response: AxiosResponse<NewsApiResponse> = await this.axiosInstance
      .get('/everything', {
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
      })
      .catch(() => {
        return {
          data: [],
        };
      });

    if (response.data?.articles) {
      response.data.articles = response.data.articles.map((item) => ({
        ...item,
        source_name: item.source?.name || 'Unknown',
        source_url: item.url,
      }));
    }

    return response.data || { status: 'ok', articles: [] };
  }
}

export class NewsDataIoClient {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.axiosInstance = axios.create({
      baseURL: 'https://newsdata.io/api/1',
      timeout: 5000,
    });
  }

  async searchArticles(
    query: string,
    filters: any
  ): Promise<NewsDataIoResponse> {
    const response: AxiosResponse<NewsDataIoResponse> = await this.axiosInstance
      .get('/news', {
        params: {
          q: query,
          country: filters.country,
          language: filters.language,
          category: filters.category,
          apikey: this.apiKey,
          ...filters,
        },
      })
      .catch(() => {
        return {
          data: [],
        };
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
      timeout: 5000,
    });
  }

  async searchArticles(query: string, filters: any): Promise<GuardianResponse> {
    const response: AxiosResponse<GuardianResponse> = await this.axiosInstance
      .get('/search', {
        params: {
          q: query,
          'from-date': filters.date,
          section: filters.category,
          'api-key': this.apiKey,
          ...filters,
          'show-elements': 'image',
        },
      })
      .catch(() => {
        return {
          data: [],
        };
      });

    if (response.data?.response?.results) {
      response.data.response.results = response.data.response.results.map(
        (item) => {
          const imageElement = item.elements?.find(
            (element) => element.relation === 'main' && element.type === 'image'
          );
          const imageUrl = imageElement?.assets?.[0]?.file || null;

          return {
            ...item,
            source_name: 'The Guardian',
            source_url: item.webUrl,
            imageUrl,
          };
        }
      );
    }

    return response.data || { response: { status: 'ok', results: [] } };
  }
}
