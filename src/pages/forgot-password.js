import {Button, EmailInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendResetPasswordEmail} from "../services/auth/auth-actions";

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
        <EmailInput value={email} onChange={onEmailChange} placeholder='Укажите e-mail'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large" onClick={onClick}>
          Восстановить
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

export default ForgotPassword;