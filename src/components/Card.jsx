const Card = ({ title, ingredients, servings }) => {
  const numberOfIngredients = ingredients.split("|").length;
  const numberOfServings = parseInt(servings.split(" ")[0], 10);
  const servingText = numberOfServings === 1 ? "Serving" : "Servings";

  return (
    <div>
      <h2>{title}</h2>
      <span>{numberOfIngredients} ingredients</span>
      <br />
      <span>
        {numberOfServings} {servingText}
      </span>
    </div>
  );
};

export default Card;
