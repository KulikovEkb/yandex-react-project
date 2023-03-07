import {Button, EmailInput, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import {Link} from 'react-router-dom';
import React, {SyntheticEvent} from 'react';
import {useDispatch} from 'react-redux';
import {register} from '../services/auth/auth-actions';
import styles from './auth.module.css';
import {useForm} from "../services/hooks/use-form";

function Register() {
  const dispatch = useDispatch();

  const {values, handleChange} = useForm({
    name: '',
    email: '',
    password: '',
  });

  const onSubmit = React.useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatch(register(values) as any);
    },
    [dispatch, values]
  );

  return (
    <form className={styles.mainContainer} onSubmit={onSubmit}>
      <p className='text text_type_main-medium'>Регистрация</p>

      <div className={`${styles.inputs} mt-6`}>
        <Input name='name' value={values.name} onChange={handleChange} placeholder='Имя'/>
        <EmailInput name='email' value={values.email} onChange={handleChange}/>
        <PasswordInput name='password' value={values.password} onChange={handleChange}/>
      </div>

      <div className='mt-6 mb-20'>
        <Button htmlType="submit" type="primary" size="large">
          Зарегистрироваться
        </Button>
      </div>

      <div className={styles.links}>
        <p className='text text_type_main-default text_color_inactive'>
          Уже зарегистрированы? <Link to='/login' className='text_color_accent'>Войти</Link>
        </p>
      </div>
    </form>
  );
}

export default Register;
