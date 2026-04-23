import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch } from '@/hooks.ts';
import { UserForm } from '@components/user-form/user-form.tsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.tsx';
import { useResetPassword } from '@hooks/use-reset-password.tsx';
import { setIsPasswordReset } from '@services/user/slice.ts';

type ForgotPasswordPageData = {
  email: string;
};

export const ForgotPasswordPage = (): React.JSX.Element => {
  const { values, errorsText, isValid, handleChange } =
    useFormWithValidation<ForgotPasswordPageData>({
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
