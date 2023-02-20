import styles from './burger-constructor.module.css'
import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import {ingredientShape} from "../../shapes/shapes";
import React from "react";
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/actions/ingredients-actions";

const Bun = ({bun, type}) => {
  const dispatch = useDispatch();

  const [{isHover}, dropRef] = useDrop({
    accept: 'bun',
    drop(ingredient){
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const isTopBun = type === 'top';

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

Bun.propTypes = {
  bun: ingredientShape,
  type: PropTypes.string.isRequired,
};

export default Bun;
