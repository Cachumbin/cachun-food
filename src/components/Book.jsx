import { useState } from "react";

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

export default Book;
