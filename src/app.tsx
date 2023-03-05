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
import {useDispatch} from "react-redux";
import {getIngredients} from "./components/burger-ingredients/store/ingredients-actions";
import {checkUserAuth} from "./services/auth/auth-actions";
import IngredientDetails from "./components/ingredient-details";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    dispatch(getIngredients() as any);
    dispatch(checkUserAuth() as any);
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
        <Route path="/profile/*" element={<ProtectedRoute element={<Profile/>}/>}/>
        <Route path="/ingredients/:id" element={<Ingredient/>}/>

        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {background && (
        <Routes>
          <Route path="/ingredients/:id" element={<IngredientDetails/>}/>
        </Routes>
      )}
    </ErrorBoundary>
  );
}

export default App;
