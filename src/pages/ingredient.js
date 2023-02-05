import styles from "../components/ingredient-details/ingredient-details.module.css";
import Detail from "../components/ingredient-details/detail";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";

function Ingredient() {
  const {id} = useParams();
  const {
    name,
    image,
    calories,
    proteins,
    fat,
    carbohydrates
    // todo(kulikov): fix
  } = useSelector(store => store.ingredients?.ingredients?.fillers.find(x => x._id === id));

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

export default Ingredient;