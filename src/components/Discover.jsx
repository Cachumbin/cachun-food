import { useState, useEffect } from "react";

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

  return (
    <div className="discover-container">
      {discover.map((recipe, index) => (
        <Book key={index} />
      ))}
    </div>
  );
};

export default Discover;
