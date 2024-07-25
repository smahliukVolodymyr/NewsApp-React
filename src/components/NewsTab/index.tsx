import { useState } from "react";
import "./style.css";

type NewsTabProps = {
  fetchLocal: () => void;
  openSaved: (open: boolean) => void;
};

function NewsTab({ fetchLocal, openSaved }: NewsTabProps) {
  const [active, setActive] = useState<"butn-1" | "butn-2">("butn-1");

  const handleSavedClick = () => {
    setActive("butn-2");
    fetchLocal();
    openSaved(true);
  };

  const handleCurrentClick = () => {
    setActive("butn-1");
    openSaved(false);
  };

  return (
    <div className="btn-container">
      <button
        className={`btn ${active === "butn-1" ? "active" : "inactive"}`}
        onClick={handleCurrentClick}
      >
        Current
      </button>

      <button
        className={`btn ${active === "butn-2" ? "active" : "inactive"}`}
        onClick={handleSavedClick}
      >
        Saved
      </button>
    </div>
  );
}

export default NewsTab;
