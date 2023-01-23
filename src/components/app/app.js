import React, {useEffect} from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from "../burger-ingredients";
import styles from './app.module.css';
import BurgerConstructor from "../burger-constructor";
import ErrorBoundary from "../../helpers/error-boundary";
import {useDispatch, useSelector} from "react-redux";
import {getIngredients} from "../burger-ingredients/actions/ingredients-actions";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

function App() {
  // todo(kulikov): use loader
  const {getIngredientsRequest, getIngredientsFail} = useSelector(store => store.ingredients);
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
        <DndProvider backend={HTML5Backend}>
          <main className={styles.app}>
            <BurgerIngredients/>
            <BurgerConstructor/>
          </main>
        </DndProvider>
      )}
    </ErrorBoundary>
  );
}

export default App;
