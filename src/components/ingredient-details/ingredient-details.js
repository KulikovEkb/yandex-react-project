import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";

const IngredientDetails = () => {
  const {
    name,
    image,
    calories,
    proteins,
    fat,
    carbohydrates
  } = useSelector(store => store.ingredients.ingredientDetails);

  return (
    <>
      <div className={styles.ingredientImage}>
        <img src={image} alt={name}/>
      </div>

      <div className='mt-4'>
        <p className={`${styles.ingredientName} text text_type_main-medium`}>{name}</p>
      </div>

      <div className={`${styles.ingredientDetails} mt-8`}>
        <Detail header='Калории, ккал' value={calories}/>
        <Detail header='Белки, г' value={proteins}/>
        <Detail header='Жиры, г' value={fat}/>
        <Detail header='Углеводы, г' value={carbohydrates}/>
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

export default IngredientDetails;
