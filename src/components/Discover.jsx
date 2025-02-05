import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import DialogBox from "./DialogBox";

const Discover = () => {
  const [rawDiscover, setRawDiscover] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [bgColors, setBgColors] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

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
      headers: { "Content-Type": "application/json" },
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
    if (rawDiscover.length === 0) return;

    setDiscover([]);

    const fetchData = async () => {
      for (let recipe of rawDiscover) {
        try {
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
            setDiscover((prevDiscover) => [...prevDiscover, data[1]]);
          }
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      }
    };

    fetchData();
  }, [rawDiscover]);

  useEffect(() => {
    if (discover.length > 0) {
      let storedColors = sessionStorage.getItem("discoverColors");

      if (storedColors) {
        setBgColors(JSON.parse(storedColors));
      } else {
        const shuffledColors = [...colors].sort(() => Math.random() - 0.5);
        let usedColors = [...shuffledColors];
        const assignedColors = [];

        assignedColors.push("var(--red)");

        for (let i = 1; i < discover.length; i++) {
          if (usedColors.length === 0) {
            usedColors = [...shuffledColors];
          }
          assignedColors.push(usedColors.pop());
        }

        sessionStorage.setItem(
          "discoverColors",
          JSON.stringify(assignedColors)
        );
        setBgColors(assignedColors);
      }
    } else {
      setBgColors([]);
    }
  }, [discover]);

  return (
    <div className="discover-window window">
      <div className="discover-top-bar window-top-bar">
        <button className="discover-button window-button">
          <IoClose className="discover-icon window-icon" />
        </button>
        <div className="discover-text-container window-text-container">
          <p className="window-text">Discover</p>
        </div>
      </div>
      <div className="discover-content window-content">
        {discover.map((recipe, index) => {
          const bgColor = bgColors[index] || "var(--red)";
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
              <div className="window-button-container">
                <button
                  onClick={() => setSelectedRecipe(recipe)}
                  className="recipe-button"
                >
                  Check More
                </button>
                <button className="recipe-button">Save Recipe</button>
              </div>
            </div>
          );
        })}
      </div>
      <DialogBox
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
        title={selectedRecipe?.title}
      >
        {selectedRecipe && (
          <>
            <p>
              <strong>Ingredients:</strong>
              <ul>
                {selectedRecipe.ingredients
                  .split("|")
                  .map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
              </ul>
            </p>
            <p>
              <strong>Instructions:</strong> {selectedRecipe.instructions}
            </p>
          </>
        )}
      </DialogBox>
    </div>
  );
};

export default Discover;
