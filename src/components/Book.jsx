import { useState } from "react";

const colors = ["#e63946", "#457b9d", "#a8dadc", "#f4a261", "#2a9d8f"];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];
const getRandomHeight = () => `${150 + Math.floor(Math.random() * 100)}px`;

const Book = ({ title, ingredients, servings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [color] = useState(getRandomColor());
  const [height] = useState(getRandomHeight());

  const numberOfServings = parseInt(servings.split(" ")[0], 10);
  const servingText = numberOfServings === 1 ? "Serving" : "Servings";

  return (
    <div className={`book-container`} onClick={() => setIsOpen(!isOpen)}>
      <div
        className={`book ${isOpen ? "open" : ""}`}
        style={{
          backgroundColor: color,
          height: height,
        }}
      >
        <div className="book-spine">
          <h2>{title}</h2>
        </div>
        <div className="book-front">
          <p>{ingredients.split("|").length} Ingredients</p>
          <span>
            {numberOfServings} {servingText}
          </span>
        </div>
        <div className="book-back"></div>
      </div>
      {isOpen && <div className="book-content">Book content</div>}
    </div>
  );
};

export default Book;
