import styles from './burger-constructor.module.css'
import {elementsShape, ingredientShape} from "../../shapes/shapes";
import React from "react";
import PropTypes from "prop-types";
import FillersList from "./fillers-list";
import Bun from "./bun";

const Ingredients = ({bun, fillers}) => {
  return (
    <div className={styles.ingredients}>
      <Bun bun={bun} type='top'/>
      <FillersList fillers={fillers}/>
      <Bun bun={bun} type='bottom'/>
    </div>);
}

Ingredients.propTypes = {
  bun: elementsShape,
  fillers: PropTypes.arrayOf(ingredientShape),
};

export default Ingredients;
