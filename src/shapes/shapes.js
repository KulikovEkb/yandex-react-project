import PropTypes from "prop-types";

const baseIngredient = {
  _id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export const ingredientShape = PropTypes.shape(baseIngredient);

export const ingredientDetailsShape = PropTypes.shape({
  ...baseIngredient,
  image_large: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
});
