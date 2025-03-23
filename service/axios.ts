import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

interface ApiResource<Req, Res> {
  get: (id: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<Res>>;
  post: (data: Req, config?: AxiosRequestConfig) => Promise<AxiosResponse<Res>>;
  put: (
    id: string,
    data: Req,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<Res>>;
  delete: (
    id: string,
    config?: AxiosRequestConfig
  ) => Promise<AxiosResponse<void>>;
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

      // Request interceptor
      this.axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
          if (this.token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${this.token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      // Response interceptor
      this.axiosInstance.interceptors.response.use(
        (response: AxiosResponse) => response,
        (error) => {
          if (error.response) {
            switch (error.response.status) {
              case 401:
                console.error('Unauthorized: Redirect to login');
                break;
              case 404:
                console.error('Resource not found');
                break;
              case 500:
                console.error('Server error');
                break;
              default:
                console.error('An error occurred:', error.message);
            }
          } else if (error.request) {
            console.error('No response received:', error.request);
          } else {
            console.error('Request setup error:', error.message);
          }
          return Promise.reject(error);
        }
      );
    }

    createResource<Req, Res>(route: string): ApiResource<Req, Res> {
        return {
            get: (id: string, config?: AxiosRequestConfig) =>
                this.axiosInstance.get<Res>(`${route}/${id}`, config),
            post: (data: Req, config?: AxiosRequestConfig) =>
                this.axiosInstance.post<Res>(route, data, config),
            put: (id: string, data: Req, config?: AxiosRequestConfig) =>
                this.axiosInstance.put<Res>(`${route}/${id}`, data, config),
            delete: (id: string, config?: AxiosRequestConfig) =>
                this.axiosInstance.delete<void>(`${route}/${id}`, config),
        };
    }

    setToken(token: string | null) {
        this.token = token;
    }

    setHeaders(headers: Record<string, string>) {
        this.axiosInstance.defaults.headers.common = {
            ...this.axiosInstance.defaults.headers.common,
            ...headers,
        };
    }
}

export default ApiService;