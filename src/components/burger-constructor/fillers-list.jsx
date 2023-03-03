import {arrayIsEmpty} from "../../helpers/collection-helper";
import styles from "./burger-constructor.module.css";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {useDispatch} from "react-redux";
import {SET_INGREDIENTS} from "./store/constructor-actions";
import React from "react";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";
import EmptyFiller from "./empty-filler";
import Filler from "./filler";

const FillersList = ({fillers}) => {
  const dispatch = useDispatch();

  if (arrayIsEmpty(fillers)) {
    return <EmptyFiller/>;
  }

  function moveItem(dragIndex, hoverIndex) {
    if (dragIndex === hoverIndex) return;

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

FillersList.propTypes = {
  fillers: PropTypes.arrayOf(ingredientShape).isRequired,
};

export default FillersList;
