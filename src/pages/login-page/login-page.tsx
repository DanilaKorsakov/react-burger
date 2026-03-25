import { Link } from 'react-router-dom';

import { useDispatch } from '@/hooks.ts';
import { UserForm } from '@components/user-form/user-form.tsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.tsx';
import { login } from '@services/user/actions.ts';

import type { FormEvent } from 'react';

type LoginPageData = {
  email: string;
  password: string;
};

export const LoginPage = (): React.JSX.Element => {
  const dispatch = useDispatch();

  const { values, errorsText, isValid, handleChange } =
    useFormWithValidation<LoginPageData>({
      email: '',
      password: '',
    });

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
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
