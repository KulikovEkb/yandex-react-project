import {Input} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";

function Profile() {
  const [nameValue, setNameValue] = React.useState('');
  const [loginValue, setLoginValue] = React.useState('');
  const [passwordValue, setPasswordValue] = React.useState('');

  // todo(kulikov): refactor
  // todo(kulikov): replace with correct values
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
      <div className='mt-6' style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Input value={nameValue} onChange={setNameValue} placeholder='Имя' icon='EditIcon'/>
        <Input value={loginValue} onChange={setLoginValue} placeholder='Логин' icon='EditIcon'/>
        <Input value={passwordValue} onChange={setPasswordValue} placeholder='Пароль' icon='EditIcon'/>
      </div>
    </div>
  );
}

export default Profile;