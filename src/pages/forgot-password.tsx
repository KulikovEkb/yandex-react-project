import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate, useLocation} from 'react-router-dom';
import React, {ChangeEvent, SyntheticEvent} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendResetPasswordEmail} from '../services/auth/auth-actions';
import styles from './auth.module.css';
import {getAuthState} from "../services/auth/auth-selectors";

function ForgotPassword() {
  const location = useLocation();
  const {resetPasswordStarted} = useSelector(getAuthState);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(sendResetPasswordEmail(email) as any);
    },
    [dispatch, email]);

  if (resetPasswordStarted) {
    return <Navigate to={'/reset-password'} state={{from: location}}/>
  }

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>

      <div className={`${styles.inputs} mt-6`}>
        <EmailInput value={email} onChange={onEmailChange} placeholder='Укажите e-mail'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </div>

      <div className={styles.links}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
        </p>
      </div>
    </form>
  );
}

export default ForgotPassword;
