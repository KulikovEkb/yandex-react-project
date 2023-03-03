import styles from './burger-constructor.module.css'
import React, {useMemo} from "react";
import Summary from "./summary";
import {useSelector} from "react-redux";
import {objectIsEmpty} from "../../helpers/collection-helper";
import Ingredients from "./ingredients";
import {getConstructorState} from "./store/constructor-selectors";

const BurgerConstructor = () => {
  const {bun, fillers} = useSelector(getConstructorState);

  const totalSum = useMemo(() => {
    return fillers.reduce((x, y) => x + y.price, 0) + ((bun?.price ?? 0) * 2);
  }, [bun, fillers]);

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Ingredients bun={bun} fillers={fillers}/>
      <Summary totalSum={totalSum} canOrder={!objectIsEmpty(bun)}/>
    </div>);
}

export default BurgerConstructor;
