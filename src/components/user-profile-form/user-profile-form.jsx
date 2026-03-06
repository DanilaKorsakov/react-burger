import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import { getError } from '@services/user/reducer.js';

import styles from './user-profile-form.module.css';

export const UserProfileForm = ({
  values,
  isValid,
  errors,
  errorsText,
  onClick,
  ref,
  isDisabled,
  isChanged,
  handleChange,
  onSubmit,
  onRevert,
}) => {
  const error = useSelector(getError);

  return (
    <form action="">
      <Input
        name="name"
        id="name"
        icon="EditIcon"
        type="text"
        placeholder="Имя"
        extraClass="mb-6"
        ref={ref}
        value={values.name || ''}
        error={errors.name}
        errorText={errorsText.name}
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
        error={errors.email}
        errorText={errorsText.email}
        onChange={handleChange}
      />
      <PasswordInput
        name="profilePassword"
        id="profilePassword"
        extraClass="mb-6"
        icon="EditIcon"
        value={values.profilePassword || ''}
        error={errors.password}
        errorText={errorsText.password}
        onChange={handleChange}
      />
      {isChanged && (
        <>
          <div className={styles.buttons}>
            <Button onClick={onRevert} size="medium" type="secondary">
              Отмена
            </Button>
            <Button disabled={!isValid} onClick={onSubmit} size="medium" type="primary">
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
