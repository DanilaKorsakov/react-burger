import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.jsx';
import { login } from '@services/user/actions.js';

export const LoginPage = () => {
  const dispatch = useDispatch();

  const { values, errors, errorsText, isValid, handleChange } = useFormWithValidation({
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(values));
  }

  return (
    <>
      <UserForm
        header={'Вход'}
        buttonName={'Войти'}
        values={values}
        isValid={isValid}
        errors={errors}
        errorsText={errorsText}
        responseErrorText={
          'Проверьте введеные данные, пользователя с таким логином и паролем нет'
        }
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{' '}
        <Link className="link" to={'/register'}>
          Зарегестрироваться
        </Link>
      </div>
      <div className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{' '}
        <Link className="link" to={'/forgot-password'}>
          Восстановить пароль
        </Link>
      </div>
    </>
  );
};
