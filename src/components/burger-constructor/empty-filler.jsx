import styles from "./burger-constructor.module.css";
import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/actions/ingredients-actions";
import React from "react";

const EmptyFiller = () => {
  const dispatch = useDispatch();

  const [{isHover}, dropRef] = useDrop({
    accept: ['main', 'sauce'],
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  let className = `${styles.emptyFiller}`;
  if (isHover) className += ` ${styles.hover}`;

  return (
    <div ref={dropRef} className={className}>
      Выберите начинку
    </div>
  );
}

export default EmptyFiller;
