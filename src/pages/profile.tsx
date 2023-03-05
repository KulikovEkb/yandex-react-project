import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {editUser, logOut} from '../services/auth/auth-actions';
import styles from './profile.module.css';
import {getAuthStateUser} from "../services/auth/auth-selectors";

function Profile() {
  const user = useSelector(getAuthStateUser);
  const dispatch = useDispatch();

  const initState = {
    name: user.name,
    email: user.email,
    password: '',
  };
  const [state, setState] = useState(initState);

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, name: e.target.value});
  }

  const onLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, email: e.target.value});
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  const wasEdited = React.useMemo(
    () => state.name !== user.name || state.email !== user.email || !!state.password,
    [user, state]
  );

  const onCancelButtonClick = () => {
    setState(initState);
  }

  const onSaveButtonClick = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(editUser(state) as any);
  }

  let onLogOutClick = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logOut() as any);
    },
    [dispatch]
  );

  return (
    <div className={styles.mainContainer}>
      <div>
        <Link to={'/profile'} className={`${styles.tab} text text_type_main-medium text_color_primary`}>Профиль</Link>
        <Link to={'/orders'} className={`${styles.tab} text text_type_main-medium text_color_inactive`}>
          История заказов
        </Link>
        <p className={`${styles.tab} text text_type_main-medium text_color_inactive`} onClick={onLogOutClick}>Выход</p>
        <p className={`${styles.disclaimer} mt-20 text text_type_main-default text_color_inactive`}>В этом
          разделе вы можете изменить свои персональные данные</p>
      </div>

      <div className={styles.inputs}>
        <Input value={state.name} onChange={onNameChange} placeholder='Имя' icon='EditIcon'/>
        <Input value={state.email} onChange={onLoginChange} placeholder='Логин' icon='EditIcon'/>
        <PasswordInput value={state.password} onChange={onPasswordChange} placeholder='Пароль' icon='EditIcon'/>

        {wasEdited && (
          <div className={styles.buttons}>
            <Button
              htmlType='button'
              type='secondary'
              size='medium'
              onClick={onCancelButtonClick}
            >
              Отмена
            </Button>

            <Button htmlType='submit' type='primary' size='medium' onClick={onSaveButtonClick}>
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
