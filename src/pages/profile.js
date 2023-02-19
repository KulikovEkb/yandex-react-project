import {Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logOut} from "../services/auth/auth-actions";

function Profile() {
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: user.name,
    login: user.email,
    password: '',
  });

  const onNameChange = e => {
    e.preventDefault();
    setState({...state, name: e.target.value});
  }

  const onLoginChange = e => {
    e.preventDefault();
    setState({...state, login: e.target.value});
  }

  const onPasswordChange = e => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  let onLogOutClick = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(logOut());
    },
    [dispatch]
  );

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
           className='text text_type_main-medium text_color_inactive' onClick={onLogOutClick}>Выход</p>
        <p style={{maxWidth: '320px'}} className='mt-20 text text_type_main-default text_color_inactive'>В этом
          разделе вы можете изменить свои персональные данные</p>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
        <Input value={state.name} onChange={onNameChange} placeholder='Имя' icon='EditIcon'/>
        <Input value={state.login} onChange={onLoginChange} placeholder='Логин' icon='EditIcon'/>
        <PasswordInput value={state.password} onChange={onPasswordChange} placeholder='Пароль' icon='EditIcon'/>
      </div>
    </div>
  );
}

export default Profile;