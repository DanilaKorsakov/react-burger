import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';

export const ResetPasswordPage = () => {
  return (
    <>
      <UserForm
        header={'Восстановление пароля'}
        hasPassword={true}
        passwordPlaceholder={'Введите новый пароль'}
        hasEmailCode={true}
        button={'Сохранить'}
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
