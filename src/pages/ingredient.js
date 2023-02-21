import detailsStyles from "../components/ingredient-details/ingredient-details.module.css";
import styles from "./ingredient.module.css";
import Detail from "../components/ingredient-details/detail";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import React from "react";
import {Loader} from "../components/loader/loader";
import {SET_DETAILS} from "../components/ingredient-details/actions/ingredient-details-actions";

function Ingredient() {
  const {getIngredientsRequest, getIngredientsFail, ingredients} = useSelector(store => store.ingredients);
  const {name, image, calories, proteins, fat, carbohydrates} = useSelector(store => store.ingredientDetails);
  const dispatch = useDispatch();
  const {id} = useParams();

  const ingredient = ingredients?.buns.find(x => x._id === id)
    || ingredients?.fillers.find(x => x._id === id)
    || ingredients?.sauces.find(x => x._id === id);

  React.useEffect(() => {
    ingredient && dispatch({type: SET_DETAILS, ingredient});
  }, [dispatch, ingredient]);

  return (
    <>
      {getIngredientsRequest ? (
        <Loader size='huge'/>
      ) : getIngredientsFail ? (
        <p className={detailsStyles.error}>
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <div className={`${styles.modalContent} pt-10 pr-10 pl-10 pb-15`}>
          <div className={styles.modalHeader}>
            <p className="text text_type_main-large">{'Детали ингредиента'}</p>
          </div>

          <div className={detailsStyles.ingredientImage}>
            <img src={image} alt={name}/>
          </div>

          <div className='mt-4'>
            <p className={`${detailsStyles.ingredientName} text text_type_main-medium`}>{name}</p>
          </div>

          <div className={`${detailsStyles.ingredientDetails} mt-8`}>
            <Detail header='Калории, ккал' value={calories}/>
            <Detail header='Белки, г' value={proteins}/>
            <Detail header='Жиры, г' value={fat}/>
            <Detail header='Углеводы, г' value={carbohydrates}/>
          </div>
        </div>
      )}
    </>
  );
}

export default Ingredient;
