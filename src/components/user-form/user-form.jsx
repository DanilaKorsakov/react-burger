import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './user-form.module.css';

export const UserForm = ({
  header,
  hasEmail,
  hasPassword,
  button,
  hasName,
  hasEmailCode,
  emailPlaceholder,
  passwordPlaceholder,
}) => {
  return (
    <>
      {header && <div className={`text text_type_main-medium mt-45 mb-6`}>{header}</div>}
      <form action="" className={styles.form}>
        {hasName && <Input type="text" placeholder="Имя" extraClass="mb-6" />}
        {hasEmail && (
          <EmailInput
            name="email"
            placeholder={emailPlaceholder || 'E-mail'}
            extraClass="mb-6"
          />
        )}
        {hasPassword && (
          <PasswordInput
            icon="ShowIcon"
            name="password"
            extraClass="mb-6"
            placeholder={passwordPlaceholder || 'Пароль'}
          />
        )}
        {hasEmailCode && (
          <Input type="text" placeholder="Введите код из письма" extraClass="mb-6" />
        )}
        {button && <Button>{button}</Button>}
      </form>
    </>
  );
};
