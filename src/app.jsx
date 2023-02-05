import React from 'react';
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

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppHeader/>

        <Routes>
          <Route path="/" element={<Constructor/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/ingredients/:id" element={<Ingredient/>}/>

          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
