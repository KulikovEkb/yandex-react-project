import {arrayIsEmpty} from "../../helpers/collection-helper";
import styles from "./burger-constructor.module.css";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {useDispatch} from "react-redux";
import {useDrag, useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/actions/ingredients-actions";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient, SET_INGREDIENTS} from "./actions/constructor-actions";
import React from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";

const FillersList = ({fillers}) => {
  const dispatch = useDispatch();

  if (arrayIsEmpty(fillers)) {
    return <EmptyFiller/>;
  }

  function moveItem(dragIndex, hoverIndex) {
    const itemsCopy = [...fillers];
    const [draggedItem] = itemsCopy.splice(dragIndex, 1);
    itemsCopy.splice(hoverIndex, 0, draggedItem);
    dispatch({type: SET_INGREDIENTS, ingredients: itemsCopy});
  }

  const className = fillers.length > 5
    ? `${styles.fillersList} ${scrollBarStyles.scrollBar} pr-2`
    : `${styles.fillersList} pr-4`;

  return (
    <div className={className}>
      {fillers.map((fillerData, index) =>
        <Filler key={fillerData.key} filler={fillerData} index={index} moveItem={moveItem}/>)}
    </div>
  );
}

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

const Filler = ({filler, index, moveItem}) => {
  const dispatch = useDispatch();

  const [{isDragging}, dragRef] = useDrag({
    item: {...filler, index},
    type: filler.type,
    //item: {ingredient, index},
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });

  const [{isHover}, dropRef] = useDrop({
    accept: ['main', 'sauce'],
    drop(ingredient) {
      if (!ingredient.key) {
        dispatch(addIngredient(ingredient));
      } else {
        const dragIndex = ingredient.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }

        moveItem(dragIndex, hoverIndex);
      }
    },
    hover(item, monitor) {
      if (!isDragging) {

        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }

        moveItem(dragIndex, hoverIndex);

        item.index = hoverIndex;
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

FillersList.propTypes = {
  fillers: PropTypes.arrayOf(ingredientShape).isRequired,
};

Filler.propTypes = {
  filler: ingredientShape.isRequired,
};

export default FillersList;
