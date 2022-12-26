import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import BurgerConstructor from "../burger-constructor/burger-constructor";
import normaClient from "../../clients/norma-client";

function App() {
  const [hasError, setHasError] = useState(false);
  const [state, setState] = useState({
    elements: {},
    ingredients: {},
  });

  useEffect(() => {
    const getState = async () => {

      let ingredients!: { buns: any[], sauces: any[], fillers: any[] };
      try {
        ingredients = await normaClient.getIngredients();
      } catch {
        setHasError(true);
      }

      return ingredients && {elements: getElements(ingredients), ingredients};
    }

    getState().then(x => x && setState(x));
  }, []);

  function getElements(ingredients: { buns: any[]; sauces: any[]; fillers: any[] }) {
    return {
      top: ingredients.buns[0],
      bottom: ingredients.buns[0],
      fillers: [
        ingredients.fillers[0],
        ingredients.sauces[0],
        ingredients.fillers[1],
        ingredients.sauces[1],
        ingredients.fillers[2],
        ingredients.fillers[3],
        ingredients.fillers[4],
      ],
    };
  }

  return (
    <>
      <AppHeader/>
      {hasError ? (
        <p className={styles.app}>
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <div className={styles.app}>
          <BurgerIngredients ingredients={state.ingredients}/>
          <BurgerConstructor elements={state.elements}/>
        </div>
      )}
    </>
  );
}

export default App;
