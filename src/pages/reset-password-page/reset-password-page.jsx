import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.jsx';
import { resetPassword } from '@services/user/actions.js';
import { getIsPasswordReset } from '@services/user/reducer.js';

export const ResetPasswordPage = () => {
  const { values, errors, errorsText, isValid, handleChange } = useFormWithValidation({
    password: '',
    code: '',
  });

  const dispatch = useDispatch();
  const isPasswordReset = useSelector(getIsPasswordReset);
  const hasEmailCode = JSON.parse(localStorage.getItem('hasEmailCode'));

  function handleSubmit(e) {
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
