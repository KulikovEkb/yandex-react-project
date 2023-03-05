import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";
import {getAuthState, getAuthStateUser} from "../services/auth/auth-selectors";
import {FC} from "react";

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  element: JSX.Element;
}

export const ProtectedRoute: FC<TProtectedRouteProps> = ({onlyUnAuth = false, element}): JSX.Element | null => {
  const {authChecked} = useSelector(getAuthState);
  const user = useSelector(getAuthStateUser);
  const location = useLocation();

  if (!authChecked)
    return null;

  if (onlyUnAuth && user)
    return <Navigate to={location.state?.from ?? '/'}/>

  if (!onlyUnAuth && !user)
    return <Navigate to="/login" state={{from: location}}/>;

  return element;
}
