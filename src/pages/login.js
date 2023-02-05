import {Button, EmailInput, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";

function Login() {
  const [email, setEmail] = React.useState('')
  const onEmailChange = e => {
    setEmail(e.target.value)
  }

  const [passwordValue, setPasswordValue] = React.useState('')
  const onPasswordChange = e => {
    setPasswordValue(e.target.value)
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
      <p className='text text_type_main-medium'>Вход</p>

      <div className='mt-6' style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <EmailInput value={email} onChange={onEmailChange}/>
        <PasswordInput value={passwordValue} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large">
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