import { Link } from 'react-router-dom';

import { UserForm } from '@components/user-form/user-form.jsx';

export const RegisterPage = () => {
  return (
    <>
      <UserForm
        header={'Регистрация'}
        hasName={true}
        hasEmail={true}
        hasPassword={true}
        button={'Зарегистрироваться'}
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
