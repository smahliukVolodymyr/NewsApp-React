import { useState, useEffect } from "react";
import { NewsData, ArticleResponse } from "../types/types";
import axios from "axios";

export default function useFetchNews() {
  const [news, setNews] = useState<NewsData[]>([]);

  useEffect(() => {
    const API_URL = process.env.REACT_APP_API_URL;
    const API_KEY = process.env.REACT_APP_API_KEY;
    axios.get(`${API_URL}${API_KEY}`).then((response) => {
      const newsData: NewsData[] = response.data.articles.map(
        (item: ArticleResponse) => ({
          title: item.title,
          description: item.description,
          source: item.source.name,
          publishedAt: item.publishedAt,
          url: item.url,
          urlToImage: item.urlToImage,
        })
      );
      setNews(newsData);
    });
  }, [news]);

  return news;
}
