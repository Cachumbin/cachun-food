import PropTypes from "prop-types";

const Recipe = ({ show }) => {
  return <>{show && <div>hola</div>}</>;
};

Recipe.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Recipe;
