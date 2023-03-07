import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link, Navigate, useLocation} from 'react-router-dom';
import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {resetPassword} from '../services/auth/auth-actions';
import styles from './auth.module.css';
import {getAuthState} from "../services/auth/auth-selectors";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

function ResetPassword() {
  const location = useLocation();
  const {resetPasswordStarted, resetPasswordFinished} = useSelector(getAuthState);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    emailCode: '',
    password: '',
  })
  const onEmailCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, emailCode: e.target.value});
  }
  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(resetPassword(state.password, state.emailCode) as any);
    },
    [dispatch, state]);

  if (resetPasswordFinished) {
    return <Navigate to={'/login'} state={{from: location}}/>
  }

  if (!resetPasswordStarted) {
    return <Navigate to={'/forgot-password'} state={{from: location}}/>
  }

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>

      <div className={`${styles.inputs} mt-6`}>
        <PasswordInput value={state.password} onChange={onPasswordChange} placeholder='Введите новый пароль'/>
        <Input value={state.emailCode} onChange={onEmailCodeChange} placeholder='Введите код из письма'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
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

export default ResetPassword;
