// NewsData.io Response
export interface NewsDataIoArticle {
  image_url: string | null;
  description: string | null;
  creator: string[] | null;
  link: string;
  title: string;
  pubDate: string;
  publisher: string;
  country: string;
  category: string;
  language: string;
  source_name: string;
  source_url: string;
}

export interface NewsDataIoResponse {
  code: string | undefined;
  results: NewsDataIoArticle[];
  nextPage?: string | null;
  status: string;
  message: string;
}

// NewsAPI.org Response
export interface NewsApiArticle {
  source: {
    id: string | null;
    name: string;
  };
  source_name: string;
  source_url: string;
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
  image_url: string | null;
}

export interface NewsApiResponse {
  articles: NewsApiArticle[];
  code: string | undefined;
  message: string;
  totalResults?: number;
  status: string;
}

// The Guardian Response

type Assets = {
  type: string;
  mimeType: string;
  file: string;
  typeDat: Record<string, string>;
};

type Elements = {
  id: string;
  relation: string;
  type: string;
  assets: Assets[];
};
export interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
  source_name: string;
  source_url: string;
  imageUrl: string | null;
  elements: Elements[];
}

export interface GuardianResponse {
  response: {
    code: string | undefined;
    status: string;
    total?: number;
    results: GuardianArticle[];
    message: string;
  };
}

export interface NewsFilters {
  q?: string | null;
  qInTitle?: string | null;
  qInMeta?: string | null;
  country?: string | null;
  category?: string | null;
  language?: string | null;
  from?: string | null;
  to?: string | null;
  domain?: string | null;
  excludeDomain?: string | null;
  page?: number | null;
  pageSize?: number | null;
}

export interface SearchArticlesFilters {
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

export interface Article {
  title: string;
  description: string | null;
  url: string;
  imageUrl: string | null;
  publishedAt: string;
  source_name: string;
  source_url: string;
}
