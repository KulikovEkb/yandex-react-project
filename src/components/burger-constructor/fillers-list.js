import {arrayIsEmpty} from "../../helpers/collection-helper";
import styles from "./burger-constructor.module.css";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {useDispatch} from "react-redux";
import {useDrop} from "react-dnd";
import {addIngredient} from "../burger-ingredients/actions/ingredients-actions";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {removeIngredient} from "./actions/constructor-actions";
import React from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";

const FillersList = ({fillers}) => {
  if (arrayIsEmpty(fillers)) {
    return <EmptyFiller/>;
  }

  const className = fillers.length > 5
    ? `${styles.fillersList} ${scrollBarStyles.scrollBar} pr-2`
    : `${styles.fillersList} pr-4`;

  return (
    <div className={className}>
      {fillers.map((fillerData, index) => <Filler key={fillerData.key} filler={fillerData} index={index}/>)}
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

  return (
    // todo(kulikov): deal with margin and paddings
    // todo(kulikov): deal with style
    <div ref={dropRef} className={`${styles.emptyFiller} pr-4`}
         style={{backgroundColor: isHover ? 'pink' : '#37363F'}}>
      Выберите начинку
    </div>
  );
}

const Filler = ({filler, index}) => {
  const dispatch = useDispatch();

  /*const [{ isDragging }, drag] = useDrag({
    item: { type: filler.type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
  });*/

  const [{isHover}, dropRef] = useDrop({
    accept: ['main', 'sauce'],
    drop(ingredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  return (
    <div className={styles.filler} ref={dropRef}
         style={{backgroundColor: isHover ? 'pink' : '#37363F'}}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={filler.name}
        price={filler.price}
        thumbnail={filler.image}
        handleClose={() => dispatch(removeIngredient(filler._id, filler.key))}
      />
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
