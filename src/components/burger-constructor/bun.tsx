import styles from './burger-constructor.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/store/ingredients-actions";
import {TIngredient} from "../../types/ingredient";
import * as consts from "./consts/consts";
import {TBunType} from "./types/bun-type";
import {useDispatch} from "../../types";

type TBunProps = {
  bun: TIngredient | null;
  type: TBunType;
}

const Bun: FC<TBunProps> = ({bun, type}) => {
  const dispatch = useDispatch();

  const [{isHover}, dropRef] = useDrop({
    accept: consts.DndTypes.Bun,
    drop(ingredient: TIngredient){
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const isTopBun = type === consts.BunTypes.Top;

  let className = `${isTopBun ? styles.topBun : styles.bottomBun}`;
  if (isHover) className += ` ${styles.hover}`;

  if (!bun) {
    return (
      <div ref={dropRef} className={className}>
        Выберите булки
      </div>
    );
  }

  const text = isTopBun ? `${bun.name} (верх)` : `${bun.name} (низ)`;

  return (
    <div ref={dropRef} className={className}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={text}
        price={bun.price}
        thumbnail={bun.image}
      />
    </div>
  );
}

export default Bun;
