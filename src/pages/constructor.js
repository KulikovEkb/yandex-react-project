import styles from './constructor.module.css';
import {useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {Loader} from "../components/loader/loader";
import BurgerIngredients from "../components/burger-ingredients";
import BurgerConstructor from "../components/burger-constructor";

function Constructor() {
  const {getIngredientsRequest, getIngredientsFail} = useSelector(store => store.ingredients);

  return (
    <>
      {getIngredientsRequest ? (
          <Loader size='huge'/>
        ) :
        getIngredientsFail ? (
          <p className={styles.constructor}>
            Ошибка при загрузке данных. Попробуйте ещё раз.
          </p>
        ) : (
          <DndProvider backend={HTML5Backend}>
            <main className={styles.constructor}>
              <BurgerIngredients/>
              <BurgerConstructor/>
            </main>
          </DndProvider>
        )}
    </>
  );
}

export default Constructor;
