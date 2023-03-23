import {TRootState} from "../../types";

export const getAuthState = (store: TRootState) => store.auth;
export const getAuthStateUser = (store: TRootState) => store.auth.user;
