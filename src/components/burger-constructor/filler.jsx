import styles from "./burger-constructor.module.css";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/store/ingredients-actions";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient} from "./store/constructor-actions";
import React from "react";
import {ingredientShape} from "../../shapes/shapes";

const Filler = ({filler, index, moveItem}) => {
  const dispatch = useDispatch();

  const [{isDragging}, dragRef] = useDrag({
    item: {isSorting: true, index},
    type: 'sorting',
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  const [{isHover}, dropRef] = useDrop({
    accept: ['main', 'sauce', 'sorting'],
    drop(ingredient) {
      if (!ingredient.isSorting) {
        dispatch(addIngredient(ingredient));
        return;
      }

      moveItem(ingredient.index, index);
    },
    hover(payload) {
      if (!payload.isSorting) return;

      if (!isDragging) {
        moveItem(payload.index, index);

        payload.index = index;
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  let className = `${styles.fillerHover}`;
  if (isHover) className += ` ${styles.hover}`;

  return (
    <div className={styles.filler} ref={(node) => dragRef(dropRef(node))}>
      <DragIcon type="primary"/>
      <div className={className}>
        <ConstructorElement
          text={filler.name}
          price={filler.price}
          thumbnail={filler.image}
          handleClose={() => dispatch(removeIngredient(filler._id, filler.key))}
        />
      </div>
    </div>
  );
}

Filler.propTypes = {
  filler: ingredientShape.isRequired,
};

export default Filler;
