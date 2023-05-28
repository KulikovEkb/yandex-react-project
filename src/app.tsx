import React, {useEffect} from 'react';
import AppHeader from './components/app-header';
import ErrorBoundary from "./helpers/error-boundary";
import {Route, Routes, useLocation} from "react-router-dom";
import Constructor from "./pages/constructor";
import NotFound from "./pages/not-found";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import ResetPassword from "./pages/reset-password";
import Profile from "./pages/profile";
import Ingredient from "./pages/ingredient";
import {ProtectedRoute} from "./components/protected-route";
import {getIngredients} from "./components/burger-ingredients/store/ingredients-actions";
import {checkUserAuth} from "./services/auth/auth-actions";
import IngredientDetails from "./components/ingredient-details";
import {useDispatch} from "./types";
import OrdersFeedPage from "./pages/orders-feed-page";
import FeedOrderPage from "./pages/feed-order-page";
import FeedOrderDetails from "./components/feed-order-details";
import UserOrdersFeedPage from "./pages/user-orders-feed-page";
import ProfileInfo from "./components/profile-info/profile-info";
import UserFeedOrderPage from "./pages/user-feed-order-page";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <AppHeader/>

      <Routes location={background || location}>
        <Route path="/" element={<Constructor/>}/>

        <Route path="/login" element={<ProtectedRoute onlyUnAuth={true} element={<Login/>}/>}/>
        <Route path="/register" element={<ProtectedRoute onlyUnAuth={true} element={<Register/>}/>}/>
        <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true} element={<ForgotPassword/>}/>}/>
        <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true} element={<ResetPassword/>}/>}/>

        <Route path="/profile" element={<ProtectedRoute element={<Profile/>}/>}>
          <Route path="/profile" element={<ProfileInfo/>}/>
          <Route path='/profile/orders' element={<UserOrdersFeedPage/>}/>
        </Route>
        <Route path="/profile/orders/:number" element={<UserFeedOrderPage/>}/>

        <Route path="/ingredients/:id" element={<Ingredient/>}/>

        <Route path="/feed" element={<OrdersFeedPage/>}/>
        <Route path="/feed/:number" element={<FeedOrderPage/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
          <Route path="/feed/:number" element={<FeedOrderDetails/>}/>
          <Route path="/profile/orders/:number" element={<ProtectedRoute element={<FeedOrderDetails/>}/>}/>
        </Routes>
      )}
    </ErrorBoundary>
  );
}

export default App;
