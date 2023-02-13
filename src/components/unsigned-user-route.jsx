import { useAuth } from '../services/auth';
import {useLocation, useNavigate} from "react-router-dom";

export const UnsignedUserRouteElement = ({ element }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  if (auth.user) {
    navigate(pathname, { state: {...state}, replace: true });
  }

  return element;
}