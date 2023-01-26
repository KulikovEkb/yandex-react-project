import {useDispatch, useSelector} from "react-redux";
import styles from "./burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../modal";
import IngredientDetails from "../ingredient-details";
import {ingredientShape} from "../../shapes/shapes";
import {useDrag} from "react-dnd";
import {useState} from "react";
import {RESET_DETAILS, SET_DETAILS} from "../ingredient-details/actions/ingredient-details-actions";

const IngredientCard = ({ingredient}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {bunId, countersMap} = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [{isDragging}, drag] = useDrag({
    type: ingredient.type,
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

  function openModal() {
    setIsOpen(true);
    dispatch({type: SET_DETAILS, ingredient});
  }

  function closeModal() {
    setIsOpen(false);
    dispatch({type: RESET_DETAILS});
  }

  let count;
  if (ingredient.type === 'bun') {
    count = bunId === ingredient._id ? 2 : null;
  } else {
    count = countersMap.get(ingredient._id);
  }

  let className = styles.card;
  if (isDragging) className += ` ${styles.dragging}`;

  return (
    <>
      <div className={styles.card} onClick={openModal}>
        <div ref={drag} className={className}>
          {count > 0 && <Counter count={count} size='default'/>}
          <img className={styles.image}
               src={ingredient.image}
               alt={ingredient.name}/>
          <div className={styles.price}>
            <p className={`text text_type_digits-default`}>{ingredient.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
        </div>
      </div>
      {isOpen && (
        <Modal headerText='Детали ингредиента' closeModal={closeModal}>
          <IngredientDetails/>
        </Modal>
      )}
    </>
  );
}

IngredientCard.propTypes = {
  ingredient: ingredientShape.isRequired,
};

export default IngredientCard;
