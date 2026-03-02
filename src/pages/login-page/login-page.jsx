import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';

export const LoginPage = () => {
  return (
    <>
      <UserForm header={'Вход'} hasEmail={true} hasPassword={true} button={'Войти'} />
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
