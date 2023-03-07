import {Button, EmailInput, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {logIn} from '../services/auth/auth-actions';
import styles from './auth.module.css'
import {useForm} from "../services/hooks/use-form";

function Login() {
  const dispatch = useDispatch();

  const {values, handleChange} = useForm({
    email: '',
    password: '',
  });

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(logIn(values.email, values.password) as any);
    },
    [dispatch, values]
  );

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
      <p className='text text_type_main-medium'>Вход</p>

      <div className={`${styles.inputs} mt-6`}>
        <EmailInput name='email' value={values.email} onChange={handleChange}/>
        <PasswordInput name='password' value={values.password} onChange={handleChange}/>
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
