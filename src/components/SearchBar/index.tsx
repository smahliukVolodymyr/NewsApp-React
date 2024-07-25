import { useEffect, useState } from "react";
import "./style.css";
import { NewsData } from "../../types/types";

type SearchBarProps = {
  news: NewsData[];
  setFilter: (data: NewsData[]) => void;
};

function SearchBar({ news, setFilter }: SearchBarProps) {
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const filterResult: NewsData[] = news.filter((item: NewsData) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilter(filterResult);
  }, [search, news, setFilter]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={search}
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
