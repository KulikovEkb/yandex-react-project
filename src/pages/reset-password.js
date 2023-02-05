import {Button, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link} from "react-router-dom";
import React from "react";

function ResetPassword() {
  const [emailCodeValue, setEmailCodeValue] = React.useState('');

  const [passwordValue, setPasswordValue] = React.useState('');
  const onPasswordChange = e => {
    setPasswordValue(e.target.value);
  }

  // todo(kulikov): refactor
  return (
    <div style={{
      position: 'fixed',
      top: '15%',
      left: '50%',
      transform: 'translate(-50%, 0)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <p className='text text_type_main-medium'>Восстановление пароля</p>

      <div className='mt-6' style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <PasswordInput value={passwordValue} onChange={onPasswordChange} placeholder='Введите новый пароль'/>
        <Input value={emailCodeValue} onChange={setEmailCodeValue} placeholder='Введите код из письма'/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="button" type="primary" size="large">
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