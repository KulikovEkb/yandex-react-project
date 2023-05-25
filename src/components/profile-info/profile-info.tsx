import {Button, Input, PasswordInput} from '@ya.praktikum/react-developer-burger-ui-components';
import React, {SyntheticEvent} from 'react';
import styles from '../../pages/profile.module.css';
import {useDispatch, useSelector} from "../../types";
import {getAuthStateUser} from "../../services/auth/auth-selectors";
import {useForm} from "../../services/hooks/use-form";
import {editUser} from "../../services/auth/auth-actions";
import {TEditUserRequest} from "../../helpers/http-clients/types/requests";

function ProfileInfo() {
  const user = useSelector(getAuthStateUser)!;
  const dispatch = useDispatch();

  const initValues = {
    name: user.name,
    email: user.email,
    password: '',
  };
  const {values, handleChange, setValues} = useForm(initValues);

  const wasEdited = React.useMemo(
    () => values.name !== user.name || values.email !== user.email || !!values.password,
    [user, values]
  );

  const onCancelButtonClick = () => {
    setValues(initValues);
  }

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    dispatch(editUser(values as TEditUserRequest));
  }

  return (
    <form onSubmit={onSubmit} style={{marginTop: '120px', marginLeft: '60px'}}>
      <div className={styles.inputs}>
        <Input name='name' value={values.name} onChange={handleChange} placeholder='Имя' icon='EditIcon'/>
        <Input name='email' value={values.email} onChange={handleChange} placeholder='Логин' icon='EditIcon'/>
        <PasswordInput name='password' value={values.password} onChange={handleChange} placeholder='Пароль' icon='EditIcon'/>

        {wasEdited && (
          <div className={styles.buttons}>
            <Button htmlType='button' type='secondary' size='medium' onClick={onCancelButtonClick}>
              Отмена
            </Button>

            <Button htmlType='submit' type='primary' size='medium'>
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}

export default ProfileInfo;
