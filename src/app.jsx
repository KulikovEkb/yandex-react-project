import React from 'react';
import AppHeader from './components/app-header';
import ErrorBoundary from "./helpers/error-boundary";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Constructor from "./pages/constructor";
import NotFound from "./pages/not-found";
import Login from "./pages/login";

function App() {
  return (
    <ErrorBoundary>
      <AppHeader/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Constructor/>}/>
          <Route path="/login" element={<Login/>}/>
          {/*todo(kulikov): implement
          <Route path="/register" element={<Register/>}/>
          todo(kulikov): implement
          <Route path="/forgot-password" element={<ForgotPassword/>}/>
          todo(kulikov): implement
          <Route path="/reset-password" element={<ResetPassword/>}/>
          todo(kulikov): implement
          <Route path="/profile" element={<Profile/>}/>
          todo(kulikov): implement
          <Route path="/ingredients/:id" element={<Ingredient/>}/>
          */}
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
