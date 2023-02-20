import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {resetPassword} from "../services/auth/auth-actions";

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

  // todo(kulikov): refactor
  return (
    <div style={{
      position: 'fixed',
      top: '150px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>

      <div className='mt-6' style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <PasswordInput value={state.password} onChange={onPasswordChange} placeholder='Введите новый пароль'/>
        <Input value={state.emailCode} onChange={onEmailCodeChange} placeholder='Введите код из письма'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Сохранить
        </Button>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
        <p className='text text_type_main-default text_color_inactive'>
          Вспомнили пароль? <Link to='/login' className='text_color_accent'>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;