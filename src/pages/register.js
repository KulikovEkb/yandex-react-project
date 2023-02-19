import {Button, EmailInput, Input, PasswordInput} from "@ya.praktikum/react-developer-burger-ui-components";
import {Link, Navigate, useLocation} from "react-router-dom";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../services/auth/auth-actions";

function Register() {
  const location = useLocation();
  const {user} = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })
  const onNameChange = e => {
    e.preventDefault();
    setState({...state, name: e.target.value});
  }

  const onEmailChange = e => {
    e.preventDefault();
    setState({...state, email: e.target.value});
  }

  const onPasswordChange = e => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  const onClick = React.useCallback(
    e => {
      e.preventDefault();
      dispatch(register(state));
    },
    [dispatch, state]
  );

  if (user)
    return <Navigate to={'/login'} state={{from: location}}/>

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
        <Input value={state.name} onChange={onNameChange} placeholder='Имя'/>
        <EmailInput value={state.email} onChange={onEmailChange}/>
        <PasswordInput value={state.password} onChange={onPasswordChange}/>
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