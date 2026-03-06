import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.jsx';
import { register } from '@services/user/actions.js';

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const { values, errors, errorsText, isValid, handleChange } = useFormWithValidation({
    name: '',
    email: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(values));
  }

  return (
    <>
      <UserForm
        header={'Регистрация'}
        buttonName={'Зарегистрироваться'}
        values={values}
        isValid={isValid}
        errors={errors}
        errorsText={errorsText}
        responseErrorText={'Такой пользователь уже существует'}
        handleChange={handleChange}
        onSubmit={handleSubmit}
      />
      <div className="text text_type_main-default text_color_inactive mt-20">
        Уже зарегистрированы?{' '}
        <Link className="link" to={'/login'}>
          Войти
        </Link>
      </div>
    </>
  );
};
