import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from './app.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import data from "../../data/data.json";

function App() {
  const elements = {
    top: data[0],
    bottom: data[0],
    fillers: [data[5], data[4], data[6], data[10], data[11], data[7], data[8], data[8]],
    //fillers: [data[5], data[4]],
  };
  const ingredients = {
    buns: [data[0], data[14]],
    sauces: [data[3], data[6], data[5], data[9]],
    //sauces: [data[3], data[6], data[5]],
    fillers: [data[13], data[11]],
  };

  return (
    <>
      <AppHeader/>
      <div className={appStyles.App}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerConstructor elements={elements}/>
      </div>
    </>
  );
}

export default App;
