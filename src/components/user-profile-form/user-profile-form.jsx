import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import styles from './user-profile-form.module.css';

export const UserProfileForm = ({ onClick, ref, isDisabled }) => {
  return (
    <form action="">
      <Input
        ref={ref}
        icon="EditIcon"
        type="text"
        placeholder="Имя"
        value="Марк"
        disabled={isDisabled}
        onIconClick={onClick}
        extraClass="mb-6"
      />
      <EmailInput
        isIcon
        name="email"
        placeholder="Логин"
        value="mail@stellar.burgers"
        extraClass="mb-6"
      />
      <PasswordInput
        icon="EditIcon"
        name="password"
        extraClass="mb-6"
        value="password"
      />
      <div className={styles.buttons}>
        <Button
          // onClick={function fee(){}}
          size="medium"
          type="secondary"
        >
          Отмена
        </Button>
        <Button
          // onClick={function fee(){}}
          size="medium"
          type="primary"
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};
