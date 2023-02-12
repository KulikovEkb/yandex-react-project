import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {Link} from "react-router-dom";

function Profile() {
  const [name, setName] = React.useState('');
  const onNameChange = e => {
    setName(e.target.value);
  }

  const [login, setLogin] = React.useState('');
  const onLoginChange = e => {
    setLogin(e.target.value);
  }

  const [password, setPassword] = React.useState('');
  const onPasswordChange = e => {
    setPassword(e.target.value);
  }

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
        {/*todo(kulikov): use NavLink with isActive*/}
        <Link to={'/profile'} style={{minHeight: '64px', display: 'flex', alignItems: 'center', textDecoration: 'none'}}
           className='text text_type_main-medium text_color_primary'>Профиль</Link>
        <Link to={'/orders'} style={{minHeight: '64px', display: 'flex', alignItems: 'center', textDecoration: 'none'}}
           className='text text_type_main-medium text_color_inactive'>История заказов</Link>
        <p style={{minHeight: '64px', display: 'flex', alignItems: 'center'}}
           className='text text_type_main-medium text_color_inactive'>Выход</p>
        <p style={{maxWidth: '320px'}} className='mt-20 text text_type_main-default text_color_inactive'>В этом
          разделе вы можете изменить свои персональные данные</p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Input value={name} onChange={onNameChange} placeholder='Имя' icon='EditIcon'/>
        <Input value={login} onChange={onLoginChange} placeholder='Логин' icon='EditIcon'/>
        <PasswordInput value={password} onChange={onPasswordChange} placeholder='Пароль' icon='EditIcon'/>
      </div>
    </div>
  );
}

export default Profile;