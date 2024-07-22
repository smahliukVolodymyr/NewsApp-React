import { useEffect, useState } from "react";
import NewsList from "./components/NewsList";
import NewsTab from "./components/NewsTab";
import SearchBar from "./components/SearchBar";
import axios from "axios";
import { NewsData, ArticleResponse } from "./types/types";

function App() {
  const [news, setNews] = useState<NewsData[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);
  const [savedNews, setSavedNews] = useState<NewsData[]>([]);
  const [openSaved, setOpenSaved] = useState<boolean>(false);

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
  }, []);

  const fetchLocalNews = () => {
    const key = process.env.REACT_APP_LOCALE_KEY;
    const localeNews = JSON.parse(localStorage.getItem(key!) || "[]");
    setSavedNews(localeNews);
  };

  return (
    <div>
      <SearchBar news={news} setFilter={setFilteredNews} />
      <NewsTab fetchLocal={fetchLocalNews} openSaved={setOpenSaved} />
      {openSaved ? (
        <NewsList news={savedNews} fetchNews={fetchLocalNews} />
      ) : (
        <NewsList news={filteredNews} />
      )}
    </div>
  );
}

export default App;
