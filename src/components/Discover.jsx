import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import DialogBox from "./DialogBox";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

const Discover = () => {
  const [rawDiscover, setRawDiscover] = useState([]);
  const [discover, setDiscover] = useState([]);
  const [bgColors, setBgColors] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [savedRecipes, setSavedRecipes] = useState([]);

  const colors = [
    "var(--yellow)",
    "var(--pink-light)",
    "var(--blue-light)",
    "var(--purple)",
    "var(--navy)",
    "var(--peach)",
    "var(--orange)",
    "var(--pink-dark)",
    "var(--green)",
  ];

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!auth.currentUser) return;

      const userRef = doc(db, "users", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setSavedRecipes(docSnap.data().savedRecipes || []);
      }
    };

    fetchSavedRecipes();
  }, []);

  useEffect(() => {
    const fetchConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: "Give me the name of 15 simple recipes separated by a comma without unnecessary spaces, and spaces between words replaced with '+' sign, all in lowercase, normal recipes only.",
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
          if (
            data[1] !== undefined &&
            !discover.find((r) => r.title === data[1].title)
          ) {
            setDiscover((prevDiscover) => [...prevDiscover, data[1]]);
          }
        } catch (error) {
          console.error("Error fetching recipe:", error);
        }
      }
    };

    fetchData();
  }, [rawDiscover]);

  function shuffleArray(array) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    if (discover.length != 0) {
      const randomColors = shuffleArray(colors);

      for (let i = 0; i < discover.length; i++) {
        setBgColors((prev) => [...prev, randomColors[i % randomColors.length]]);
      }
    }
  }, [discover]);

  const saveRecipe = async (recipe) => {
    if (!auth.currentUser) {
      alert("You must be logged in to save recipes.");
      return;
    }

    const userRef = doc(db, "users", auth.currentUser.uid);

    try {
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, { savedRecipes: [] });
      }

      await updateDoc(userRef, {
        savedRecipes: arrayUnion(recipe),
      });

      setSavedRecipes((prev) => [...prev, recipe]);
    } catch (error) {
      console.error("Error saving recipe:", error);
    }
  };

  const unsaveRecipe = async (recipe) => {
    if (!auth.currentUser) return;

    const userRef = doc(db, "users", auth.currentUser.uid);

    try {
      await updateDoc(userRef, {
        savedRecipes: arrayRemove(recipe),
      });

      setSavedRecipes((prev) => prev.filter((r) => r.title !== recipe.title));
    } catch (error) {
      console.error("Error unsaving recipe:", error);
    }
  };

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
          const bgColor = index === 0 ? "var(--red)" : bgColors[index];
          const textColor =
            bgColor === "var(--navy)" || bgColor === "var(--purple)"
              ? "white"
              : "var(--outline-color)";

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
                <button
                  onClick={() =>
                    savedRecipes.find((r) => r.title === recipe.title)
                      ? unsaveRecipe(recipe)
                      : saveRecipe(recipe)
                  }
                  className="recipe-button"
                >
                  {savedRecipes.find((r) => r.title === recipe.title)
                    ? "Unsave"
                    : "Save"}
                </button>
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
