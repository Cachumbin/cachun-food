import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Recipe from "./Recipe";

const Discover = () => {
  const [rawDiscover, setRawDiscover] = useState([]);
  const [discover, setDiscover] = useState([]);
  const colors = [
    "var(--yellow)",
    "var(--pink-light)",
    "var(--blue-light)",
    "var(--purple)",
    "var(--navy)",
    "var(--red)",
    "var(--peach)",
    "var(--orange)",
    "var(--pink-dark)",
    "var(--green)",
  ];

  useEffect(() => {
    const fetchConfig = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Give me the name of 15 simple recipes separated by a coma without unnecesary spaces, and spaces between words change it with '+' sign, and without any capital letter, dont make rare recipes, all normal, to fetch contents from an api",
              },
            ],
          },
        ],
      }),
    };

    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
        import.meta.env.VITE_GEMINI_API_KEY
      }`,
      fetchConfig
    )
      .then((response) => response.json())
      .then((data) => {
        const recipes = data.candidates[0].content.parts[0].text
          .replace("\n", "")
          .split(",");
        setRawDiscover(recipes);
      });
  }, []);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = [];
      for (let recipe of rawDiscover) {
        const response = await fetch(
          `https://api.api-ninjas.com/v1/recipe?query=${recipe}`,
          {
            method: "GET",
            headers: {
              "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
            },
          }
        );
        const data = await response.json();
        if (data[1] !== undefined) {
          fetchedData.push(data[1]);
        }
      }
      setDiscover(fetchedData);
    }
    fetchData();
  }, [rawDiscover]);

  const distributeColors = (itemCount) => {
    // Ensure all colors are used at least once
    const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
    let usedColors = [...shuffledColors];
    const result = [];
    let lastColor = "";

    for (let i = 0; i < itemCount; i++) {
      if (usedColors.length === 0) {
        usedColors = [...shuffledColors];
      }
      const nextColor = usedColors.find((color) => color !== lastColor);
      result.push(nextColor);
      lastColor = nextColor;
      usedColors = usedColors.filter((color) => color !== nextColor);
    }

    return result;
  };

  const bgColors = distributeColors(discover.length);

  return (
    <div className="discover-window window">
      <div className="discover-top-bar window-top-bar">
        <button className="discover-button window-button">
          <IoClose className="discover-icon window-icon" />
        </button>
        <div className="discover-text-container window-text-container">
          Discover
        </div>
      </div>
      <div className="discover-content window-content">
        {discover.map((recipe, index) => {
          const bgColor = index === 0 ? "var(--red)" : bgColors[index];
          const textColor =
            bgColor === "var(--navy)" || bgColor === "var(--purple)"
              ? "white"
              : "black";

          return (
            <div
              key={index}
              className="window-content-page discover-content-page"
              style={{
                backgroundColor: bgColor,
                color: textColor,
              }}
            >
              <div className="discover-recipe">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-ing">
                  {recipe.ingredients.split("|").length}{" "}
                  {recipe.ingredients.length === 1
                    ? "Ingredient"
                    : "Ingredients"}
                </p>
                <p className="recipe-servings">
                  {recipe.servings[0]}{" "}
                  {recipe.servings[0] === "1" ? "Serving" : "Servings"}
                </p>
              </div>
              <button>Check More</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Discover;
