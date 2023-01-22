import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import styles from './app.module.css';
import BurgerConstructor from "../burger-constructor";
import ErrorBoundary from "../../helpers/error-boundary";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../../services/actions/common-actions";

function App() {
  // todo(kulikov): use loader
  const {getIngredientsRequest, getIngredientsFail} = useSelector(store => store.common);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppHeader/>
      {getIngredientsFail ? (
        <p className={styles.app}>
          Ошибка при загрузке данных. Попробуйте ещё раз.
        </p>
      ) : (
        <main className={styles.app}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </main>
      )}
    </ErrorBoundary>
  );
}

export default App;
