import { useState } from "react";

const colors = ["#e63946", "#457b9d", "#a8dadc", "#f4a261", "#2a9d8f"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const getRandomHeight = () => `${150 + Math.floor(Math.random() * 100)}px`;

const Book = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [color] = useState(getRandomColor());
  const [height] = useState(getRandomHeight());

  return (
    <div
      className={`book ${isOpen ? "open" : ""}`}
      style={{
        backgroundColor: color,
        height: height,
      }}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="book-front"></div>
      <div className="book-spine"></div>
      <div className="book-back"></div>
      {isOpen && <div className="book-content">Book content</div>}
    </div>
  );
};

export default Book;
