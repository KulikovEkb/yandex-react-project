import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';
import {editUser, logOut} from '../services/auth/auth-actions';
import styles from './profile.module.css';
import {getAuthStateUser} from "../services/auth/auth-selectors";
import {useForm} from "../services/hooks/use-form";
import {useDispatch, useSelector} from "../types";
import {TEditUserRequest} from "../clients/types/requests";

function Profile() {
  const user = useSelector(getAuthStateUser)!;
  const dispatch = useDispatch();

  const initValues = {
    name: user.name,
    email: user.email,
    password: '',
  };
  const {values, handleChange, setValues} = useForm(initValues);

  const wasEdited = React.useMemo(
    () => values.name !== user.name || values.email !== user.email || !!values.password,
    [user, values]
  );

  const onCancelButtonClick = () => {
    setValues(initValues);
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(editUser(values as TEditUserRequest));
  }

  let onLogOutClick = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logOut());
    },
    [dispatch]
  );

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
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
        <Input name='name' value={values.name} onChange={handleChange} placeholder='Имя' icon='EditIcon'/>
        <Input name='email' value={values.email} onChange={handleChange} placeholder='Логин' icon='EditIcon'/>
        <PasswordInput name='password' value={values.password} onChange={handleChange} placeholder='Пароль' icon='EditIcon'/>

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

            <Button htmlType='submit' type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default Profile;
