import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import appStyles from './app.module.css';
import data from "../../data/data.json";

function App() {
  const ingredients = {
    buns: [data[0], data[14]],
    sauces: [data[3], data[6], data[5], data[9]],
    //sauces: [data[3], data[6], data[5]],
    fillers: [data[13], data[11]],
  }

  return (
    <>
      <AppHeader/>
      <div className={appStyles.App}>
        <BurgerIngredients ingredients={ingredients}/>
        <BurgerIngredients ingredients={ingredients}/>
      </div>
    </>
  );
}

export default App;
