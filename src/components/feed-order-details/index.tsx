import Modal from "../modal";
import React, {useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIngredientsState} from "../burger-ingredients/store/ingredients-selectors";
import {TIngredient} from "../../types/ingredient";
import {useDispatch, useSelector} from "../../types";
import {getOrdersFeedState} from "../orders-feed/store/orders-feed-selectors";
import scrollBarStyles from "../../helpers/scroll-bar.module.css";
import {CurrencyIcon, FormattedDate} from "@ya.praktikum/react-developer-burger-ui-components";
import {getStatusText} from "../../helpers/order-helper";
import {getUserOrdersFeedState} from "../user-orders-feed/store/user-orders-feed-selectors";

// todo(kulikov): styles
const FeedOrderDetails = () => {
  const {ingredientsMap} = useSelector(getIngredientsState);
  // todo(kulikov): fix
  const {orders} = useSelector(getOrdersFeedState);
  const userOrders = useSelector(getUserOrdersFeedState).orders;
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const numberString = useParams().number!;

  /*const ingredient = useMemo<TIngredient | undefined>(() => {
    return ingredientsMap.get(id!);
  }, [ingredientsMap]);*/

  /*React.useEffect(() => {
    ingredient && dispatch({type: SET_DETAILS, ingredient});
  }, [dispatch, ingredient]);*/

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background);
    //dispatch({type: RESET_DETAILS});
  }, [location.state, navigate]);

  const orderData = useMemo(() => {
    const number = parseInt(numberString);

    // todo(kulikov): fetch order if it is missing
    let order = orders.find(x => x.number === number);
    if (!order) order = userOrders.find(x => x.number === number)!;

    const orderIngredientsMap = new Map<string, { ingredient: TIngredient, quantity: number }>();
    let sum = 0;

    for (const ingredientId of order.ingredients) {
      if (!ingredientId) continue;

      let orderIngredient = orderIngredientsMap.get(ingredientId);

      if (orderIngredient) {
        orderIngredient.quantity++;
      } else {
        orderIngredient = {ingredient: ingredientsMap.get(ingredientId)!, quantity: 1};
      }

      orderIngredientsMap.set(ingredientId, orderIngredient);

      sum += orderIngredient.ingredient.price;
    }

    return {
      number: order.number,
      name: order.name,
      status: order.status,
      createdAt: new Date(order.createdAt),
      sum: sum,
      ingredients: Array.from(orderIngredientsMap.values()),
    }
  }, [numberString, orders, userOrders, ingredientsMap]);


  return (
    <Modal headerText={`#${orderData.number}`} headerIsNumber={true} closeModal={closeModal}>
      <div style={{display: 'flex', flexDirection: 'column', width: 'inherit'}}>
        <p className='text text_type_main-medium' style={{marginTop: '20px'}}>{orderData.name}</p>
        <p className='text text_type_main-default'
           style={{marginTop: '8px', color: 'var(--colors-interface-success)'}}>{getStatusText(orderData.status)}</p>
        <p className='text text_type_main-medium' style={{marginTop: '60px'}}>Состав:</p>
        <ul className={`${scrollBarStyles.scrollBar}`}
            style={{
              listStyle: 'none',
              maxHeight: 'calc(100vh - 600px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              paddingLeft: '0',
              marginTop: '24px',
              marginBottom: '40px'
            }}>
          {orderData.ingredients.map(x => {
            return (
              <li key={x.ingredient._id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 'calc(100% - 24px)'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                  <img src={x.ingredient.image} alt={x.ingredient.name} style={{
                    width: '64px',
                    height: '64px',
                    border: '2px solid transparent',
                    borderRadius: '50%',
                    background: 'linear-gradient(#1C1C21, #1C1C21), linear-gradient(to right, #801AB2, #4C4CFF)',
                    backgroundClip: 'padding-box, border-box',
                    backgroundOrigin: 'padding-box, border-box',
                    objectFit: 'cover',
                    position: 'relative',
                    boxSizing: 'border-box',
                  }}/>
                  <p className='text text_type_main-default'>{x.ingredient.name}</p>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                  <p className='text text_type_digits-default'>{x.quantity} x {x.ingredient.price}</p>
                  <CurrencyIcon type="primary"/>
                </div>
              </li>
            );
          })}
        </ul>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <FormattedDate date={orderData.createdAt} className={`text text_type_main-default text_color_inactive`}/>
          <div style={{display: 'flex'}}>
            <p className={`mr-2 text text_type_digits-default`}>{orderData.sum}</p>
            <CurrencyIcon type="primary"/>
          </div>
        </div>
      </div>
    </Modal>);
}

export default FeedOrderDetails;
