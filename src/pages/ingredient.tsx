import detailsStyles from "../components/ingredient-details/ingredient-details.module.css";
import styles from "./ingredient.module.css";
import Detail from "../components/ingredient-details/detail";
import {useParams} from "react-router-dom";
import React, {useMemo} from "react";
import {Loader} from "../components/loader/loader";
import {SET_DETAILS} from "../components/ingredient-details/store/ingredient-details-actions";
import {getIngredientsState} from "../components/burger-ingredients/store/ingredients-selectors";
import {getIngredientDetailsState} from "../components/ingredient-details/store/ingredient-details-selectors";
import {TIngredients} from "../types/ingredients";
import {useDispatch, useSelector} from "../types";

function Ingredient() {
  const {getIngredientsRequest, getIngredientsFail, ingredients} = useSelector(getIngredientsState);
  const {name, image, calories, proteins, fat, carbohydrates} = useSelector(getIngredientDetailsState);
  const dispatch = useDispatch();
  const {id} = useParams();

  const ingredient = useMemo(() => {
    const castedIngredients = ingredients as TIngredients;

    return castedIngredients?.buns.find(x => x._id === id)
      || castedIngredients?.fillers.find(x => x._id === id)
      || castedIngredients?.sauces.find(x => x._id === id);
  }, [ingredients]);

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
