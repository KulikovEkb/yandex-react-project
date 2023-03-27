import Modal from "../modal";
import React, {useMemo} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {getIngredientsState} from "../burger-ingredients/store/ingredients-selectors";
import {TIngredient} from "../../types/ingredient";
import {useDispatch, useSelector} from "../../types";
import {getOrdersFeedState} from "../orders-feed/store/orders-feed-selectors";

const FeedOrderDetails = () => {
  const {ingredientsMap} = useSelector(getIngredientsState);
  const {orders} = useSelector(getOrdersFeedState);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams();

  const ingredient = useMemo<TIngredient | undefined>(() => {
    return ingredientsMap.get(id!);
  }, [ingredientsMap]);

  /*React.useEffect(() => {
    ingredient && dispatch({type: SET_DETAILS, ingredient});
  }, [dispatch, ingredient]);*/

  const closeModal = React.useCallback(() => {
    location?.state?.background && navigate(location.state.background);
    //dispatch({type: RESET_DETAILS});
  }, [location.state, navigate]);

  const order = orders.find(x => x._id === id)!;
  const orderIngredients = new Map<string, { ingredient: TIngredient, quantity: number }>();

  for (const ingredientId of order.ingredients) {
    let orderIngredient = orderIngredients.get(ingredientId);

    if (orderIngredient) {
      orderIngredient.quantity++;
    } else {
      orderIngredient = {ingredient: ingredientsMap.get(ingredientId)!, quantity: 1};
    }

    orderIngredients.set(ingredientId, orderIngredient);
  }

  return (<Modal headerText={`#${order.number}`} closeModal={closeModal}>
    {order.name}
  </Modal>);
}

export default FeedOrderDetails;
