import {useSelector} from "react-redux";
import styles from "./burger-ingredients.module.css";
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import React, {FC} from "react";
import {Link, useLocation} from "react-router-dom";
import {getIngredientsState} from "./store/ingredients-selectors";
import {TIngredient} from "../../types/ingredient";

const IngredientCard: FC<{ingredient: TIngredient}> = ({ingredient}) => {
  const location = useLocation();
  const {bunId, countersMap} = useSelector(getIngredientsState);

  const [{isDragging}, dragRef] = useDrag({
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
    <div className={styles.card}>
      <div ref={dragRef} className={className}>
        <Link to={`/ingredients/${ingredient._id}`} state={{background: location}} className={styles.link}>
          {count > 0 && <Counter count={count} size='default'/>}
          <img className={styles.image}
               src={ingredient.image}
               alt={ingredient.name}/>
          <div className={styles.price}>
            <p className={`text text_type_digits-default`}>{ingredient.price}</p>
            <CurrencyIcon type="primary"/>
          </div>
          <p className={`text text_type_main-default ${styles.name}`}>{ingredient.name}</p>
        </Link>
      </div>
    </div>
  );
}

export default IngredientCard;
