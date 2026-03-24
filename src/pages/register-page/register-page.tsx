import { Link } from 'react-router-dom';

import { useDispatch } from '@/hooks.ts';
import { UserForm } from '@components/user-form/user-form.js';
import { useFormWithValidation } from '@hooks/use-form-with-validation.js';
import { register } from '@services/user/actions.ts';

import type { FormEvent } from 'react';

type RegisterPageData = {
  name: string;
  email: string;
  password: string;
};

export const RegisterPage = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const { values, errorsText, isValid, handleChange } =
    useFormWithValidation<RegisterPageData>({
      name: '',
      email: '',
      password: '',
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
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
