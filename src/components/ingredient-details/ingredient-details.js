import styles from './ingredient-details.module.css'
import {ingredientDetailsShape} from "../../shapes/shapes";
import {useSelector} from "react-redux";

const IngredientDetails = () => {
  const {modalIngredient} = useSelector(store => store.common);

  return (
    <>
      <div className={styles.ingredientImage}>
        <img src={modalIngredient.image_large} alt={modalIngredient.name}/>
      </div>

      <div className='mt-4'>
        <p className={`${styles.ingredientName} text text_type_main-medium`}>{modalIngredient.name}</p>
      </div>

      <div className={`${styles.ingredientDetails} mt-8`}>
        <Detail header='Калории, ккал' value={modalIngredient.calories}/>
        <Detail header='Белки, г' value={modalIngredient.proteins}/>
        <Detail header='Жиры, г' value={modalIngredient.fat}/>
        <Detail header='Углеводы, г' value={modalIngredient.carbohydrates}/>
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
  //ingredient: ingredientDetailsShape.isRequired,
}

export default IngredientDetails;
