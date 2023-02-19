import React, {useEffect} from 'react';
import AppHeader from './components/app-header';
import ErrorBoundary from "./helpers/error-boundary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import {getIngredients} from "./components/burger-ingredients/actions/ingredients-actions";
import {checkUserAuth} from "./services/auth/auth-actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppHeader/>

        <Routes>
          <Route path="/" element={<Constructor/>}/>
          <Route path="/login" element={<ProtectedRoute onlyUnAuth={true} element={<Login/>}/>}/>
          <Route path="/register" element={<ProtectedRoute onlyUnAuth={true} element={<Register/>}/>}/>
          <Route path="/forgot-password" element={<ProtectedRoute onlyUnAuth={true} element={<ForgotPassword/>}/>}/>
          <Route path="/reset-password" element={<ProtectedRoute onlyUnAuth={true} element={<ResetPassword/>}/>}/>
          <Route path="/profile/*" element={<ProtectedRoute element={<Profile/>}/>}/>
          <Route path="/ingredients/:id" element={<Ingredient/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
