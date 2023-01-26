import {useDispatch, useSelector} from "react-redux";
import styles from "./burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {addIngredient, closeDetailsModal, openDetailsModal} from "./actions/ingredients-actions";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import {ingredientShape} from "../../shapes/shapes";
import {useDrag} from "react-dnd";

const IngredientCard = ({ingredient}) => {
  const {bunId, countersMap, detailsModalIsOpen} = useSelector(store => store.ingredients);
  const dispatch = useDispatch();

  const [{isDragging}, drag] = useDrag({
    type: ingredient.type,
    item: ingredient,
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    })
  });

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
      <div className={styles.card} onClick={() => dispatch(openDetailsModal(ingredient))}>
        <div ref={drag} className={className}>
          {count > 0 && <Counter count={count} size='default'/>}
          <img className={styles.image}
               src={ingredient.image}
               alt={ingredient.name}
               onClick={() => dispatch(openDetailsModal(ingredient))}/>
          <div className={styles.price}>
            <p className={`text text_type_digits-default`}>{ingredient.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
        </div>
      </div>
      {detailsModalIsOpen && (
        <Modal headerText='Детали ингредиента' closeModal={() => dispatch(closeDetailsModal())}>
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