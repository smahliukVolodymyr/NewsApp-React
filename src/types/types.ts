export interface NewsData {
  title: string;
  description: string | null;
  source: string;
  publishedAt: string;
  url: string;
  urlToImage: string | null;
}

export interface ArticleResponse {
  author: string;
  content: string | null;
  description: string | null;
  publishedAt: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string | null;
}
