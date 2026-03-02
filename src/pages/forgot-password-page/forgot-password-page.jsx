import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';

export const ForgotPasswordPage = () => {
  return (
    <>
      <UserForm
        header={'Восстановление пароля'}
        hasEmail={true}
        emailPlaceholder={'Укажите e-mail'}
        button={'Восстановить'}
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
