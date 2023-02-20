import styles from './ingredient-details.module.css'
import {useDispatch, useSelector} from "react-redux";
import Detail from "./detail";
import Modal from "../modal";
import React from "react";
import {RESET_DETAILS, SET_DETAILS} from "./actions/ingredient-details-actions";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Loader} from "../loader/loader";

const IngredientDetails = () => {
  const {getIngredientsRequest, getIngredientsFail, ingredients} = useSelector(store => store.ingredients);
  const {name, image, calories, proteins, fat, carbohydrates} = useSelector(store => store.ingredientDetails);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const ingredient = ingredients?.buns.find(x => x._id === id)
    || ingredients?.fillers.find(x => x._id === id)
    || ingredients?.sauces.find(x => x._id === id);

  React.useEffect(() => {
    ingredient && dispatch({type: SET_DETAILS, ingredient});
  }, [dispatch, ingredient]);

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background)
    dispatch({type: RESET_DETAILS});
  }, [location.state, navigate]);

  return (<Modal headerText='Детали ингредиента' closeModal={closeModal}>
    {getIngredientsRequest ? (
      <Loader size='huge'/>
    ) : getIngredientsFail ? (
      <p className={styles.error}>
        Ошибка при загрузке данных. Попробуйте ещё раз.
      </p>
    ) : (
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
    )}
  </Modal>);
}

export default IngredientDetails;
