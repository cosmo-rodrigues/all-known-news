import { GuardianResponse, NewsApiResponse, NewsDataIoResponse } from '@/types';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

export class NewsApiClient {
    private axiosInstance: AxiosInstance;
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
        this.axiosInstance = axios.create({
            baseURL: 'https://newsapi.org/v2',
        });
    }

    async searchArticles(query: string, filters: any): Promise<NewsApiResponse> {
        const response: AxiosResponse<NewsApiResponse> = await this.axiosInstance.get('/everything', {
            params: {
                q: query,
                from: filters.date,
                sortBy: 'publishedAt',
                apiKey: this.apiKey,
                ...filters,
            },
        });
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

    async searchArticles(query: string, filters: any): Promise<NewsDataIoResponse> {
        const response: AxiosResponse<NewsDataIoResponse> = await this.axiosInstance.get('/news', {
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
        const response: AxiosResponse<GuardianResponse> = await this.axiosInstance.get('/search', {
            params: {
                q: query,
                'from-date': filters.date,
                section: filters.category,
                'api-key': this.apiKey,
                ...filters,
            },
        });
        return response.data;
    }
}