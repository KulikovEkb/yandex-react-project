import styles from "./burger-constructor.module.css";
import {useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/store/ingredients-actions";
import React from "react";
import * as consts from "./consts/consts";
import {TIngredient} from "../../types/ingredient";
import {useDispatch} from "../../types";

const EmptyFiller = () => {
  const dispatch = useDispatch();

  const [{isHover}, dropRef] = useDrop({
    accept: [consts.DndTypes.Main, consts.DndTypes.Sauce],
    drop(ingredient: TIngredient) {
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
