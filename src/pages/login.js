import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link, Navigate} from "react-router-dom";
import {useAuth} from "../services/auth";

function Login() {
  const auth = useAuth();
  const [email, setEmail] = React.useState('')
  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const [password, setPassword] = React.useState('')
  const onPasswordChange = e => {
    setPassword(e.target.value)
  }

  let login = React.useCallback(
    e => {
      e.preventDefault();
      auth.logIn(email, password);
    },
    [auth, email, password]
  );

  if (auth.user) return <Navigate to={'/'}/>

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
      <p className='text text_type_main-medium'>Вход</p>

      <div className='mt-6' style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <EmailInput value={email} onChange={onEmailChange}/>
        <PasswordInput value={password} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button onClick={login} htmlType="button" type="primary" size="large">
          Войти
        </Button>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center'}}>
        <p className='text text_type_main-default text_color_inactive'>
          Вы — новый пользователь? <Link to='/register' className='text_color_accent'>Зарегистрироваться</Link>
        </p>
        <p className='text text_type_main-default text_color_inactive'>
          Забыли пароль? <Link to='/forgot-password' className='text_color_accent'>Восстановить пароль</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;