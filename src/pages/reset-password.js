import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate, useLocation} from 'react-router-dom';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../services/auth/auth-actions';
import styles from './auth.module.css';

function ResetPassword() {
  const location = useLocation();
  const {resetPasswordStarted, resetPasswordFinished} = useSelector(store => store.auth);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    emailCode: '',
    password: '',
  })
  const onEmailCodeChange = e => {
    e.preventDefault();
    setState({...state, emailCode: e.target.value});
  }
  const onPasswordChange = e => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(resetPassword(state.password, state.emailCode));
    },
    [dispatch, state]);

  if (resetPasswordFinished) {
    return <Navigate to={'/login'} state={{from: location}}/>
  }

  if (!resetPasswordStarted) {
    return <Navigate to={'/forgot-password'} state={{from: location}}/>
  }

  return (
    <div className={styles.mainContainer}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>

      <div className={`${styles.inputs} mt-6`}>
        <PasswordInput value={state.password} onChange={onPasswordChange} placeholder='Введите новый пароль'/>
        <Input value={state.emailCode} onChange={onEmailCodeChange} placeholder='Введите код из письма'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Сохранить
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

export default ResetPassword;