import { type FormEvent, useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from '@/hooks.ts';
import { UserProfileForm } from '@components/user-profile-form/user-profile-form.tsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.tsx';
import { changeUserData } from '@services/user/actions.ts';
import { getUserData } from '@services/user/slice.ts';

import type { TProfileFormValues } from '@utils/types.ts';

export const ProfileSettingsPage = (): React.JSX.Element => {
  const ref = useRef<HTMLInputElement | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const user = useSelector(getUserData);
  const dispatch = useDispatch();

  const { values, errorsText, isValid, handleChange, handleRevert } =
    useFormWithValidation<TProfileFormValues>({
      name: user?.name,
      email: user?.email,
      profilePassword: '',
    });

  useEffect(() => {
    function handleBlur(): void {
      setIsDisabled(!isDisabled);
    }

    const input = ref.current;

    if (!isDisabled) {
      input?.focus();
      input?.addEventListener('blur', handleBlur);
      return (): void => {
        input?.removeEventListener('blur', handleBlur);
      };
    }
  }, [isDisabled]);

  useEffect(() => {
    if (
      values.name !== user?.name ||
      values.email !== user?.email ||
      values.profilePassword !== ''
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [values]);

  function handleClick(): void {
    setIsDisabled(!isDisabled);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    dispatch(changeUserData(values));
    setIsChanged(false);
  }

  return (
    <>
      <UserProfileForm
        values={values}
        isValid={isValid}
        errorsText={errorsText}
        onClick={handleClick}
        ref={ref}
        isDisabled={isDisabled}
        isChanged={isChanged}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        onRevert={handleRevert}
      />
    </>
  );
};
