import styles from './ingredient-details.module.css'
import {ingredientDetailsShape} from "../../shapes/shapes";

const IngredientDetails = ({ingredient}) => {
  return (
    <>
      <div className={styles.ingredientImage}>
        <img src={ingredient.image_large} alt={ingredient.name}/>
      </div>

      <div className='mt-4'>
        <p className={`${styles.ingredientName} text text_type_main-medium`}>{ingredient.name}</p>
      </div>

      <div className={`${styles.ingredientDetails} mt-8`}>
        <Detail header='Калории, ккал' value={ingredient.calories}/>
        <Detail header='Белки, г' value={ingredient.proteins}/>
        <Detail header='Жиры, г' value={ingredient.fat}/>
        <Detail header='Углеводы, г' value={ingredient.carbohydrates}/>
      </div>
    </>
  );
}

const Detail = ({header, value}) => {
  return (
    <div className={`${styles.ingredientDetail} text_color_inactive`}>
      <p className={`${styles.ingredientDetailText} text text_type_main-default`}>{header}</p>
      <p className={`${styles.ingredientDetailText} text text_type_digits-default`}>{value}</p>
    </div>
  );
}

IngredientDetails.propTypes = {
  ingredient: ingredientDetailsShape.isRequired,
}

export default IngredientDetails;
