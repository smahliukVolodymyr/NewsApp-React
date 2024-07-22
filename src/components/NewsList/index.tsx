import { NewsData } from "../../types/types";
import NewsItem from "../NewsItem";
import "./style.css";

interface NewsListProps {
  news: NewsData[];
  fetchNews?: () => void;
}

function NewsList({ news, fetchNews }: NewsListProps) {
  return (
    <div className="list-container">
      {news.map((item: NewsData) => (
        <NewsItem data={item} key={item.url} fetchNews={fetchNews} />
      ))}
    </div>
  );
}

export default NewsList;
