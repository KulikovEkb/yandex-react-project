import {Button, EmailInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate, useLocation} from 'react-router-dom';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {sendResetPasswordEmail} from '../services/auth/auth-actions';
import styles from './auth.module.css';

function ForgotPassword() {
  const location = useLocation();
  const {resetPasswordStarted} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [email, setEmail] = React.useState('');
  const onEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
  }

  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(sendResetPasswordEmail(email));
    },
    [dispatch, email]);

  if (resetPasswordStarted) {
    return <Navigate to={'/reset-password'} state={{from: location}}/>
  }

  return (
    <div className={styles.mainContainer}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>

      <div className={`${styles.inputs} mt-6`}>
        <EmailInput value={email} onChange={onEmailChange} placeholder='Укажите e-mail'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Восстановить
        </Button>
      </div>

      <div className={styles.links}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;