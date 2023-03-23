import styles from './burger-constructor.module.css'
import React, {useMemo} from "react";
import Summary from "./summary";
import {objectIsEmpty} from "../../helpers/collection-helper";
import Ingredients from "./ingredients";
import {getConstructorState} from "./store/constructor-selectors";
import {TFillerIngredient} from "./types/filler-type";
import {useSelector} from "../../types";

const BurgerConstructor = () => {
  const {bun, fillers} = useSelector(getConstructorState);

  const totalSum = useMemo<number>(() => {
    return fillers.reduce((x: number, y: TFillerIngredient) => x + y.price, 0) + ((bun?.price ?? 0) * 2);
  }, [bun, fillers]);

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Ingredients bun={bun} fillers={fillers}/>
      <Summary totalSum={totalSum} canOrder={!objectIsEmpty(bun)}/>
    </div>);
}

export default BurgerConstructor;
