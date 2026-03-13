import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.jsx';
import { useResetPassword } from '@hooks/use-reset-password.jsx';
import { setIsPasswordReset } from '@services/user/reducer.js';

export const ForgotPasswordPage = () => {
  const { values, errors, errorsText, isValid, handleChange } = useFormWithValidation({
    email: '',
  });

  const dispatch = useDispatch();
  const { handleSubmit } = useResetPassword(values);

  useEffect(() => {
    dispatch(setIsPasswordReset(false));
  }, []);

  return (
    <>
      <UserForm
        header={'Восстановление пароля'}
        emailPlaceholder={'Укажите e-mail'}
        buttonName={'Восстановить'}
        values={values}
        isValid={isValid}
        errors={errors}
        errorsText={errorsText}
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
  );
};
