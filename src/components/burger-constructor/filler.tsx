import styles from "./burger-constructor.module.css";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/store/ingredients-actions";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient} from "./store/constructor-actions";
import React, {FC} from "react";
import * as consts from "./consts/consts";
import {TFillerIngredient} from "./types/filler-type";

type TFiller = {
  filler: TFillerIngredient;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

const Filler: FC<TFiller> = ({filler, index, moveItem}) => {
  const dispatch = useDispatch();

  const [{isDragging}, dragRef] = useDrag({
    item: {isSorting: true, index},
    type: consts.DndTypes.Sorting,
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  const [{isHover}, dropRef] = useDrop({
    accept: [consts.DndTypes.Main, consts.DndTypes.Sauce, consts.DndTypes.Sorting],
    drop(ingredient: {isSorting: boolean; index: number}) {
      if (!ingredient.isSorting) {
        dispatch(addIngredient(ingredient) as any);
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
          handleClose={() => dispatch(removeIngredient(filler._id, filler.key) as any)}
        />
      </div>
    </div>
  );
}

export default Filler;
