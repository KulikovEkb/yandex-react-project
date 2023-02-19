import {Navigate, useLocation} from 'react-router-dom';
import {useSelector} from "react-redux";

export const ProtectedRoute = ({onlyUnAuth = false, element}) => {
  const authChecked = useSelector(store => store.auth.authChecked);
  const user = useSelector(store => store.auth.user);
  const location = useLocation();

  if (!authChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    return <Navigate to={location.state?.from ?? '/'}/>
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return element;
}