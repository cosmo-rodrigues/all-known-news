import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

interface ApiResource<Req, Res> {
    get: (id: string) => Promise<AxiosResponse<Res>>;
    post: (data: Req) => Promise<AxiosResponse<Res>>;
    put: (id: string, data: Req) => Promise<AxiosResponse<Res>>;
    delete: (id: string) => Promise<AxiosResponse<void>>;
}

interface ApiServiceConfig {
    baseURL: string;
    headers?: Record<string, string>;
}

class ApiService {
    private axiosInstance: AxiosInstance;
    private token: string | null = null;

    constructor(config: ApiServiceConfig) {
        this.axiosInstance = axios.create({
            baseURL: config.baseURL,
            headers: config.headers,
        });

        // Add a request interceptor to inject the token
        this.axiosInstance.interceptors.request.use(
            (config: InternalAxiosRequestConfig) => {
                if (this.token) {
                    config.headers = config.headers || {};
                    config.headers.Authorization = `${this.token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }

    createResource<Req, Res>(route: string): ApiResource<Req, Res> {
        return {
            get: (id: string) => this.axiosInstance.get<Res>(`${route}/${id}`),
            post: (data: Req) => this.axiosInstance.post<Res>(route, data),
            put: (id: string, data: Req) => this.axiosInstance.put<Res>(`${route}/${id}`, data),
            delete: (id: string) => this.axiosInstance.delete(`${route}/${id}`),
        };
    }

    setToken(token: string | null) {
        this.token = token;
    }
}

export default ApiService;