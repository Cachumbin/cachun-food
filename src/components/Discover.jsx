import { useState, useEffect } from "react";

const Discover = () => {
  const [rawDiscover, setRawDiscover] = useState([]);
  const [discover, setDiscover] = useState([]);

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
                text: "Give me the name of 20 simple recipes separated by a coma without unnecesary spaces, and spaces between words change it with '+' sign, and without any capital letter, dont make rare recipes, all normal, to fetch contents from an api",
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
        console.log(recipes);
        setRawDiscover(recipes);
      });
  }, []);

  useEffect(() => {
    const finalRecipes = [];

    for (let i = 0; i < rawDiscover.length; i++) {
      const query = rawDiscover[i].replace(/\s/g, "+").toLowerCase();
      fetch(`https://api.api-ninjas.com/v1/recipe?query=${query}`, {
        method: "GET",
        headers: {
          "X-Api-Key": import.meta.env.VITE_API_NINJAS_API_KEY,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          finalRecipes.push(data[0]);
        });
    }
    console.log(finalRecipes);
    setDiscover(finalRecipes);
  }, [rawDiscover]);

  return <div>si</div>;
};

export default Discover;
