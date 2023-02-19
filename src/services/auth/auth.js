import {useContext, useState, createContext} from 'react';

import React from 'react';
import normaClient from "../../clients/norma-client";
import {expireCookie, setCookie} from "../../helpers/cookie-helper";

// todo(kulikov): replace with Redux
const AuthContext = createContext(undefined);

export function ProvideAuth({children}) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const [user, setUser] = useState(null);

  async function getUser() {
    const data = await normaClient.getUser();

    if (data.success) {
      setUser({...data.user});
    }
  }

  async function logIn(email, password) {
    const data = await normaClient.login(email, password);

    setCookie('token', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    const fifteenMinutes = 15 * 60 * 1000;
    const date = new Date();
    localStorage.setItem('expiresAt', date.setTime(date.getTime() + fifteenMinutes).toString());

    if (data.success) {
      setUser({...data.user});
    }
  }

  async function logOut() {
    await normaClient.logout();

    setUser(null);

    expireCookie('token');
  }

  return {user, getUser, logIn, logOut};
}