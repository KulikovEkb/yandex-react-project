import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";
import normaClient from "../clients/norma-client";

function ResetPassword() {
  const [emailCode, setEmailCode] = React.useState('');
  const onEmailCodeChange = e => {
    setEmailCode(e.target.value);
  }

  const [password, setPassword] = React.useState('');
  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  const [emailSent, setEmailSent] = useState(false);

  // todo(kulikov): rewrite
  async function onClick() {
    try {
      await normaClient.resetPassword(password, emailCode);

      setEmailSent(true);
    } catch (exc) {
      console.log(exc);
    }
  }

  if (emailSent) {
    return <Navigate to={'/login'}/>
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
        <PasswordInput value={password} onChange={onPasswordChange} placeholder='Введите новый пароль'/>
        <Input value={emailCode} onChange={onEmailCodeChange} placeholder='Введите код из письма'/>
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