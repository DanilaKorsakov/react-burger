import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@krgaa/react-developer-burger-ui-components';
import { type ChangeEvent, type FormEvent, useEffect } from 'react';

import { useDispatch, useSelector } from '@/hooks.ts';
import { getError, getLoading, setError } from '@services/user/reducer.ts';

import styles from './user-form.module.css';

type UserFormValues = {
  name?: string;
  email?: string;
  password?: string;
  code?: string;
};

type UserFormErrors = {
  code: boolean;
};

type UserFormErrorsText = {
  email?: string;
  password?: string;
  code?: string;
};

type UserFormProps = {
  header?: string;
  buttonName?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  values: UserFormValues;
  errors?: UserFormErrors;
  errorsText: UserFormErrorsText;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
  responseErrorText?: string;
};

export const UserForm = ({
  header,
  buttonName,
  emailPlaceholder,
  passwordPlaceholder,
  values,
  errors,
  errorsText,
  handleChange,
  onSubmit,
  isValid,
  responseErrorText,
}: UserFormProps): React.JSX.Element => {
  const error = useSelector(getError);
  const isLoading = useSelector(getLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setError(null));
  }, []);

  return (
    <>
      {header && <div className={`text text_type_main-medium mt-45 mb-6`}>{header}</div>}
      <form action="" className={styles.form} onSubmit={onSubmit}>
        {'name' in values && (
          <Input
            name="name"
            id="name"
            type="text"
            placeholder="Имя"
            extraClass="mb-6"
            value={values.name || ''}
            onChange={handleChange}
          />
        )}
        {'email' in values && (
          <EmailInput
            name="email"
            id="email"
            placeholder={emailPlaceholder || 'E-mail'}
            extraClass="mb-6"
            value={values.email || ''}
            errorText={errorsText.email}
            onChange={handleChange}
          />
        )}
        {'password' in values && (
          <PasswordInput
            icon="ShowIcon"
            name="password"
            id="password"
            placeholder={passwordPlaceholder || 'Пароль'}
            extraClass="mb-6"
            value={values.password || ''}
            errorText={errorsText.password}
            onChange={handleChange}
          />
        )}
        {'code' in values && (
          <Input
            name="code"
            id="code"
            type="text"
            placeholder="Введите код из письма"
            extraClass="mb-6"
            value={values.code || ''}
            error={errors?.code}
            errorText={errorsText.code}
            onChange={handleChange}
          />
        )}
        {buttonName && (
          <Button disabled={!isValid || isLoading} htmlType="submit">
            {buttonName}
          </Button>
        )}
        {error && (
          <div className={`text text_type_main-default ${styles.error} mt-5`}>
            {responseErrorText}
          </div>
        )}
      </form>
    </>
  );
};
