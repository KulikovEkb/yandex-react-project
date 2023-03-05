import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import React, {ChangeEvent, SyntheticEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {register} from '../services/auth/auth-actions';
import styles from './auth.module.css';

function Register() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
  })
  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, name: e.target.value});
  }

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, email: e.target.value});
  }

  const onPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setState({...state, password: e.target.value});
  }

  const onClick = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(register(state) as any);
    },
    [dispatch, state]
  );

  return (
    <div className={styles.mainContainer}>
      <p className='text text_type_main-medium'>Регистрация</p>

      <div className={`${styles.inputs} mt-6`}>
        <Input value={state.name} onChange={onNameChange} placeholder='Имя'/>
        <EmailInput value={state.email} onChange={onEmailChange}/>
        <PasswordInput value={state.password} onChange={onPasswordChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button onClick={onClick} htmlType="button" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>

      <div className={styles.links}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы? <Link to='/login' className='text_color_accent'>Войти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;