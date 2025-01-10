import { useState } from "react";
import "./Discover.css";

const colors = ["#e63946", "#457b9d", "#a8dadc", "#f4a261", "#2a9d8f"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const getRandomHeight = () => `${150 + Math.floor(Math.random() * 100)}px`;

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`book ${isOpen ? "open" : ""}`}
      style={{
        backgroundColor: getRandomColor(),
        height: getRandomHeight(),
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen && <div className="book-content">Book Opened!</div>}
    </div>
  );
};

const Discover = () => {
  return (
    <div className="discover-container">
      {Array.from({ length: 20 }).map((_, index) => (
        <Book key={index} />
      ))}
    </div>
  );
};

export default Discover;
