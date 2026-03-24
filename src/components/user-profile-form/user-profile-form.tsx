import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';

import { useSelector } from '@/hooks.ts';
import { getError } from '@services/user/reducer.ts';

import type { FormEvent, Ref } from 'react';

import styles from './user-profile-form.module.css';

type UserProfileFormValues = {
  name: string | undefined;
  email: string | undefined;
  profilePassword: string | undefined;
};

type userProfileFormErrorsText = {
  email: string;
  profilePassword: string;
};

type userProfileFormProps = {
  values: UserProfileFormValues;
  isValid: boolean;
  errorsText: userProfileFormErrorsText;
  onClick: () => void;
  ref: Ref<HTMLInputElement>;
  isDisabled: boolean;
  isChanged: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onRevert: () => void;
};

export const UserProfileForm = ({
  values,
  isValid,
  errorsText,
  onClick,
  ref,
  isDisabled,
  isChanged,
  handleChange,
  onSubmit,
  onRevert,
}: userProfileFormProps): React.JSX.Element => {
  const error = useSelector(getError);

  return (
    <form action="" onSubmit={onSubmit}>
      <Input
        name="name"
        id="name"
        icon="EditIcon"
        type="text"
        placeholder="Имя"
        extraClass="mb-6"
        ref={ref}
        value={values.name || ''}
        disabled={isDisabled}
        onIconClick={onClick}
        onChange={handleChange}
      />
      <EmailInput
        name="email"
        id="email"
        placeholder="Логин"
        extraClass="mb-6"
        isIcon
        value={values.email || ''}
        errorText={errorsText.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="profilePassword"
        id="profilePassword"
        extraClass="mb-6"
        icon="EditIcon"
        value={values.profilePassword || ''}
        errorText={errorsText.profilePassword}
        onChange={handleChange}
      />
      {isChanged && (
        <>
          <div className={styles.buttons}>
            <Button onClick={onRevert} size="medium" type="secondary" htmlType="button">
              Отмена
            </Button>
            <Button disabled={!isValid} size="medium" type="primary" htmlType="submit">
              Сохранить
            </Button>
          </div>
          {error && (
            <div className={`text text_type_main-default ${styles.error} mt-5`}>
              Не удалось отредактировать данные
            </div>
          )}
        </>
      )}
    </form>
  );
};
