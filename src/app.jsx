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
import {ProvideAuth} from "./services/auth";
import {ProtectedRouteElement} from "./components/protected-route";
import {UnsignedUserRouteElement} from "./components/unsigned-user-route";

function App() {
  return (
    <ErrorBoundary>
      <ProvideAuth>
        <BrowserRouter>
          <AppHeader/>

          <Routes>
            <Route path="/" element={<Constructor/>}/>
            <Route path="/login" element={<UnsignedUserRouteElement element={<Login/>}/>}/>
            <Route path="/register" element={<UnsignedUserRouteElement element={<Register/>}/>}/>
            <Route path="/forgot-password" element={<UnsignedUserRouteElement element={<ForgotPassword/>}/>}/>
            <Route path="/reset-password" element={<UnsignedUserRouteElement element={<ResetPassword/>}/>}/>
            <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>}/>
            <Route path="/ingredients/:id" element={<Ingredient/>}/>

            <Route path="*" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
    </ErrorBoundary>
  );
}

export default App;
