import styles from './burger-constructor.module.css'
import scrollBarStyles from '../../utils/scroll-bar.module.css'
import {Button, ConstructorElement, DragIcon, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {ingredientShape} from "../../shapes/shapes";

const BurgerConstructor = ({elements}) => {
  if (!elements || Object.keys(elements).length === 0) return null;

  const totalSum = elements.fillers.reduce((x, y) => x + y.price, 0) + elements.top.price + elements.bottom.price;

  return (
    <div className={`${styles.constructor} pt-25 pl-4`}>
      <Elements elements={elements}/>
      <Summary totalSum={totalSum}/>
    </div>);
}

const Elements = (props) => {
  return (
    <div className={styles.elements}>
      <Bun itemData={props.elements.top} type='top'/>
      <FillersList fillers={props.elements.fillers}/>
      <Bun itemData={props.elements.bottom} type='bottom'/>
    </div>);
}

const Bun = (props) => {
  const text = props.type === 'top' ? `${props.itemData.name} (верх)` : `${props.itemData.name} (низ)`;

  return (
    <div className='ml-8'>
      <ConstructorElement
        type={props.type}
        isLocked={true}
        text={text}
        price={props.itemData.price}
        thumbnail={props.itemData.image}
      />
    </div>
  );
}

const FillersList = (props) => {
  if (!props.fillers || props.fillers.length === 0) {
    return null;
  }

  const className = props.fillers.length > 5
    ? `${styles.fillersList} ${scrollBarStyles.scrollBar} pr-2`
    : `${styles.fillersList} pr-4`;

  return (
    <div className={className}>
      {props.fillers.map((fillerData, index) => <Filler key={index} data={fillerData}/>)}
    </div>
  );
}

const Filler = (props) => {
  return (
    <div className={styles.filler}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={props.data.name}
        price={props.data.price}
        thumbnail={props.data.image}
      />
    </div>
  );
}

const Summary = (props) => {
  return (
    <div className={`${styles.summary} mt-10 mr-4`}>
      <div className={styles.totalSum}>
        <p className="text text_type_digits-medium">
          {props.totalSum}
        </p>
        <div className={styles.currencyIconWrapper}>
          <CurrencyIcon type="primary"/>
        </div>
      </div>
      <Button htmlType="button" type="primary" size="large">
        Оформить заказ
      </Button>
    </div>);
}

const elementsShape = PropTypes.shape({
  top: ingredientShape,
  bottom: ingredientShape,
  fillers: PropTypes.arrayOf(ingredientShape),
})

BurgerConstructor.propTypes = {
  elements: elementsShape.isRequired,
};

export default BurgerConstructor;
