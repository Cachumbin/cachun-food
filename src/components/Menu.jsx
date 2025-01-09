import Search from "./Search";
import Card from "./Card";
import { useState } from "react";

const Menu = () => {
  const [result, setResult] = useState([]);

  const fetchFunction = async (search) => {
    if (search === "") {
      return;
    }
    const response = await fetch(
      `https://api.api-ninjas.com/v1/recipe?query=${search}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
        },
      }
    );
    const data = await response.json();
    setResult(data);
  };
  return (
    <div className="menu-container">
      <Search fetchFunction={fetchFunction} />
      <ul>
        {result.map((recipe) => {
          return (
            <Card
              key={recipe.title}
              title={recipe.title}
              ingredients={recipe.ingredients}
              servings={recipe.servings}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Menu;
