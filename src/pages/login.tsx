import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {ChangeEvent, SyntheticEvent} from 'react';
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

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, email: e.target.value});
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logIn(state.email, state.password) as any);
    },
    [dispatch, state]
  );

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
      <p className='text text_type_main-medium'>Вход</p>

      <div className={`${styles.inputs} mt-6`}>
        <EmailInput value={state.email} onChange={onEmailChange}/>
        <PasswordInput value={state.password} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="submit" type="primary" size="large">
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
    </form>
  );
}

export default Login;