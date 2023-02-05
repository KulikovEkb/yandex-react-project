import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import React from "react";

function Register() {
  const [nameValue, setNameValue] = React.useState('');

  const [email, setEmail] = React.useState('');
  const onEmailChange = e => {
    setEmail(e.target.value);
  }

  const [passwordValue, setPasswordValue] = React.useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
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
        <Input value={nameValue} onChange={setNameValue} placeholder='Имя'/>
        <EmailInput value={email} onChange={onEmailChange}/>
        <PasswordInput value={passwordValue} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large">
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