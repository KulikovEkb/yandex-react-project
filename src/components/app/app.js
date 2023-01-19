import React, {useEffect, useState} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import BurgerConstructor from "../burger-constructor";
import normaClient from "../../clients/norma-client";
import ErrorBoundary from "../../utils/error-boundary";
import {BurgerContext} from "../../services/burger-context";

function App() {
  const [hasError, setHasError] = useState(false);
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    const getState = async () => {
      let ingredients;
      try {
        ingredients = await normaClient.getIngredients();

        if (!ingredients) return;

        setIngredients(ingredients);
      } catch {
        setHasError(true);
      }
    }

    getState();
  }, []);

  return (
    <ErrorBoundary>
      <AppHeader/>
      {hasError ? (
        <p className={styles.app}>
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <main className={styles.app}>
          <BurgerContext.Provider value={{ingredients, setIngredients}}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </BurgerContext.Provider>
        </main>
      )}
    </ErrorBoundary>
  );
}

export default App;
