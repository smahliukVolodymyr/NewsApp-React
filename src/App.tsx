import { useState } from "react";
import NewsList from "./components/NewsList";
import NewsTab from "./components/NewsTab";
import SearchBar from "./components/SearchBar";
import { NewsData } from "./types/types";
import useFetchNews from "./hooks/useFetchNews";

function App() {
  const [filteredNews, setFilteredNews] = useState<NewsData[]>([]);
  const [savedNews, setSavedNews] = useState<NewsData[]>([]);
  const [openSaved, setOpenSaved] = useState<boolean>(false);

  const news = useFetchNews();

  const fetchLocalNews = () => {
    const key = process.env.REACT_APP_LOCALE_KEY;
    const localeNews = JSON.parse(localStorage.getItem(key!) || "[]");
    setSavedNews(localeNews);
  };

  return (
    <div>
      <SearchBar news={news} setFilter={setFilteredNews} />
      <NewsTab fetchLocal={fetchLocalNews} openSaved={setOpenSaved} />
      <NewsList
        news={openSaved ? savedNews : filteredNews}
        fetchNews={openSaved ? fetchLocalNews : undefined}
      />
    </div>
  );
}

export default App;
