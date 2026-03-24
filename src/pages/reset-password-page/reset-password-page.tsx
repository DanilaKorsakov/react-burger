import { Link, Navigate } from 'react-router-dom';

import { useDispatch, useSelector } from '@/hooks.ts';
import { UserForm } from '@components/user-form/user-form.tsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.tsx';
import { resetPassword } from '@services/user/actions.ts';
import { getIsPasswordReset } from '@services/user/reducer.ts';

import type { FormEvent } from 'react';

type ResetPasswordPageData = {
  password: string;
  code: string;
};

export const ResetPasswordPage = (): React.JSX.Element => {
  const { values, errors, errorsText, isValid, handleChange } =
    useFormWithValidation<ResetPasswordPageData>({
      password: '',
      code: '',
    });

  const dispatch = useDispatch();
  const isPasswordReset = useSelector(getIsPasswordReset);
  const hasEmailCode: boolean = JSON.parse(
    localStorage.getItem('hasEmailCode') || 'false'
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(resetPassword(values));
  }

  return (
    <>
      {hasEmailCode ? (
        <>
          <UserForm
            header={'Восстановление пароля'}
            passwordPlaceholder={'Введите новый пароль'}
            buttonName={'Сохранить'}
            values={values}
            isValid={isValid}
            errors={errors}
            errorsText={errorsText}
            responseErrorText={'Код из письма не сходится, проверьте код на почте'}
            handleChange={handleChange}
            onSubmit={handleSubmit}
          />
          <div className="text text_type_main-default text_color_inactive mt-20">
            Вспомнили пароль?{' '}
            <Link className="link" to={'/login'}>
              Войти
            </Link>
          </div>
        </>
      ) : (
        <>
          {isPasswordReset ? (
            <Navigate to={'/login'} replace />
          ) : (
            <Navigate to={'/forgot-password'} replace />
          )}
        </>
      )}
    </>
  );
};
