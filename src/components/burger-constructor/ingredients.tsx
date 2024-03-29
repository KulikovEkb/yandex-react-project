import styles from './burger-constructor.module.css'
import React, {FC} from "react";
import FillersList from "./fillers-list";
import Bun from "./bun";
import {TIngredient} from "../../types/ingredient";
import {TFillerIngredient} from "./types/filler-type";

type TIngredientsProps = {
  bun: TIngredient | null,
  fillers: Array<TFillerIngredient>
};

const Ingredients: FC<TIngredientsProps> = ({bun, fillers}) => {
  return (
    <div className={styles.ingredients}>
      <Bun bun={bun} type='top'/>
      <FillersList fillers={fillers}/>
      <Bun bun={bun} type='bottom'/>
    </div>);
}

export default Ingredients;
