import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate} from "react-router-dom";
import React, {useState} from "react";
import normaClient from "../clients/norma-client";

function Register() {
  const [name, setName] = React.useState('');
  const onNameChange = e => {
    setName(e.target.value);
  }

  const [email, setEmail] = React.useState('');
  const onEmailChange = e => {
    setEmail(e.target.value);
  }

  const [password, setPassword] = React.useState('');
  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

  const [registered, setRegistered] = useState(false);

  // todo(kulikov): rewrite
  async function onClick() {
    try {
      // todo(kulikov): save cookie
      const result = await normaClient.register({name, email, password});

      setRegistered(true);
      console.log(result);
    } catch (exc) {
      console.log(exc);
    }
  }

  if (registered) {
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
      <p className='text text_type_main-medium'>Регистрация</p>

      <div className='mt-6' style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Input value={name} onChange={onNameChange} placeholder='Имя'/>
        <EmailInput value={email} onChange={onEmailChange}/>
        <PasswordInput value={password} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы? <Link to='/login' className='text_color_accent'>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;