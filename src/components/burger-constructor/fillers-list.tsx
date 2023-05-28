import {arrayIsEmpty} from "../../helpers/collection-helper";
import styles from "./burger-constructor.module.css";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {SET_INGREDIENTS} from "./store/constructor-actions";
import React, {FC} from "react";
import EmptyFiller from "./empty-filler";
import Filler from "./filler";
import {TFillerIngredient} from "./types/filler-type";
import {useDispatch} from "../../types";

type TFillersListProps = {
  fillers: Array<TFillerIngredient>;
};

const FillersList: FC<TFillersListProps> = ({fillers}) => {
  const dispatch = useDispatch();

  if (arrayIsEmpty(fillers))
    return <EmptyFiller/>;

  function moveItem(dragIndex: number, hoverIndex: number) {
    if (dragIndex === hoverIndex)
      return;

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
        <Filler key={fillerData.key.toString()} filler={fillerData} index={index} moveItem={moveItem}/>)}
    </div>
  );
}

export default FillersList;
