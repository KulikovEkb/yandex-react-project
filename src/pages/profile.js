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
      top: '150px',
      left: '50%',
      transform: 'translate(-50%, 0)',
      display: 'grid',
      gridTemplateColumns: '320px max-content 320px',
      columnGap: '60px'
    }}>
      <div>
        <p style={{minHeight: '64px', display: 'flex', alignItems: 'center'}}
           className='text text_type_main-medium text_color_primary'>Профиль</p>
        <p style={{minHeight: '64px', display: 'flex', alignItems: 'center'}}
           className='text text_type_main-medium text_color_inactive'>История заказов</p>
        <p style={{minHeight: '64px', display: 'flex', alignItems: 'center'}}
           className='text text_type_main-medium text_color_inactive'>Выход</p>
        <p style={{maxWidth: '320px'}} className='mt-20 text text_type_main-default text_color_inactive'>В этом
          разделе вы можете изменить свои персональные данные</p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Input value={nameValue} onChange={setNameValue} placeholder='Имя' icon='EditIcon'/>
        <Input value={loginValue} onChange={setLoginValue} placeholder='Логин' icon='EditIcon'/>
        <Input value={passwordValue} onChange={setPasswordValue} placeholder='Пароль' icon='EditIcon'/>
      </div>
    </div>
  );
}

export default Profile;