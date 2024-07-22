import { NewsData } from "../../types/types";
import { AiOutlineRight } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import "./style.css";

interface NewsItemProps {
  data: NewsData;
  fetchNews?: () => void;
}

function NewsItem({ data, fetchNews }: NewsItemProps) {
  const key = process.env.REACT_APP_LOCALE_KEY;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    if (date >= today) {
      return `${hours}:${minutes}`;
    } else {
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${month}-${day} ${hours}:${minutes}`;
    }
  };
  const editDescriptionLength = (description: string, length: number = 100) => {
    if (description.length > length) {
      return description.slice(0, length) + "...";
    }
    return description;
  };

  const findDublicates = (news: NewsData[]) => {
    const filter = news.some(
      (item: NewsData) =>
        item.title === data.title && item.publishedAt === data.publishedAt
    );
    return filter;
  };

  const filterElements = (news: NewsData[]) => {
    const filter = news.filter(
      (item: NewsData) =>
        item.title !== data.title && item.publishedAt !== data.publishedAt
    );
    return filter;
  };

  const handleSave = () => {
    const savedNews = localStorage.getItem(key!);
    let parsedNews: NewsData[] = [];

    if (savedNews) {
      parsedNews = JSON.parse(savedNews);
      const theSame = findDublicates(parsedNews);
      if (theSame) return;
    }
    const dataToStore = JSON.stringify([...parsedNews, data]);
    localStorage.setItem(key!, dataToStore);
    if (fetchNews) {
      fetchNews();
    }
  };

  const handleRemove = () => {
    const savedNews = localStorage.getItem(key!);
    if (savedNews) {
      const parsedNews: NewsData[] = JSON.parse(savedNews);
      const filteredData = filterElements(parsedNews);
      const dataToStore = JSON.stringify(filteredData);
      localStorage.setItem(key!, dataToStore);
      if (fetchNews) {
        fetchNews();
      }
    }
  };

  return (
    <div className="news-container">
      {data.urlToImage && (
        <img src={data.urlToImage} alt="news item" className="news-img" />
      )}
      <div className="news-text">
        <div className="news-main">
          <h2>{data.title}</h2>
          <div className="news-right">
            <span>{formatDate(data.publishedAt)}</span>
            <a href={data.url} target="_blank" rel="noreferrer">
              <AiOutlineRight size={24} />
            </a>
          </div>
        </div>
        <h3>{data.source}</h3>
        {data.description && <p>{editDescriptionLength(data.description)}</p>}
        <div className="local-icons">
          <FaRegBookmark size={24} onClick={handleSave} />
          <MdDeleteOutline size={32} onClick={handleRemove} />
        </div>
      </div>
    </div>
  );
}

export default NewsItem;
