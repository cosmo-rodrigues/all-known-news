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
}

export interface NewsDataIoResponse {
  data: NewsDataIoArticle[];
  nextPage: string | null;
}

// NewsAPI.org Response
export interface NewsApiArticle {
  source: {
      id: string | null;
      name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: NewsApiArticle[];
}

// The Guardian Response
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
}

export interface GuardianResponse {
  response: {
      status: string;
      total: number;
      results: GuardianArticle[];
  };
}