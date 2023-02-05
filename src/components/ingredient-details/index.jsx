import styles from './ingredient-details.module.css'
import {useSelector} from "react-redux";
import Detail from "./detail";

const IngredientDetails = () => {
  const {
    name,
    image,
    calories,
    proteins,
    fat,
    carbohydrates
  } = useSelector(store => store.ingredientDetails);

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

export default IngredientDetails;