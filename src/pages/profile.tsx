import React, {SyntheticEvent} from 'react';
import {NavLink, Outlet} from 'react-router-dom';
import {logOut} from '../services/auth/auth-actions';
import styles from './profile.module.css';
import {useDispatch} from "../types";

function Profile() {
  const dispatch = useDispatch();

  let onLogOutClick = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logOut());
    },
    [dispatch]
  );

  const navLinkClassName = React.useCallback(
    ({ isActive }: { isActive: boolean }) =>
      `${styles.tab} text text_type_main-medium ${isActive ? 'text_color_primary' : 'text_color_inactive'}`,
    [],
  );

  return (
    <main className={styles.mainContainer}>
      <aside className={styles.aside}>
        <div>
          <NavLink to={'/profile'} className={navLinkClassName} end>Профиль</NavLink>
          <NavLink to={'/profile/orders'} className={navLinkClassName} end>История заказов</NavLink>
          <p className={`${styles.tab} text text_type_main-medium text_color_inactive`} onClick={onLogOutClick}>Выход</p>
        </div>

        <p className={`${styles.disclaimer} mt-20 text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </aside>

      <Outlet />
    </main>
  );
}

export default Profile;
