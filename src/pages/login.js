import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logIn} from '../services/auth/auth-actions';
import styles from './auth.module.css'

function Login() {
  const dispatch = useDispatch();

  const [state, setState] = React.useState({
    email: '',
    password: '',
  });

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
      dispatch(logIn(state.email, state.password));
    },
    [dispatch, state]
  );

  return (
    <div className={styles.mainContainer}>
      <p className='text text_type_main-medium'>Вход</p>

      <div className={`${styles.inputs} mt-6`}>
        <EmailInput value={state.email} onChange={onEmailChange}/>
        <PasswordInput value={state.password} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Войти
        </Button>
      </div>

      <div className={styles.links}>
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
