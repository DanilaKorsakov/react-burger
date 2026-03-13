import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserProfileForm } from '@components/user-profile-form/user-profile-form.jsx';
import { useFormWithValidation } from '@hooks/use-form-with-validation.jsx';
import { changeUserData } from '@services/user/actions.js';
import { getUserData } from '@services/user/reducer.js';

export const ProfileSettingsPage = () => {
  const ref = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChanged, setIsChanged] = useState(false);

  const user = useSelector(getUserData);
  const dispatch = useDispatch();

  const { values, errors, errorsText, isValid, handleChange, handleRevert } =
    useFormWithValidation({
      name: user.name,
      email: user.email,
      profilePassword: '',
    });

  useEffect(() => {
    function handleBlur() {
      setIsDisabled(!isDisabled);
    }

    const input = ref.current;

    if (!isDisabled) {
      input?.focus();
      input?.addEventListener('blur', handleBlur);
      return () => {
        input?.removeEventListener('blur', handleBlur);
      };
    }
  }, [isDisabled]);

  useEffect(() => {
    if (
      values.name !== user.name ||
      values.email !== user.email ||
      values.profilePassword !== ''
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [values]);

  function handleClick() {
    setIsDisabled(!isDisabled);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(changeUserData(values));
    setIsChanged(false);
  }

  return (
    <>
      <UserProfileForm
        values={values}
        errors={errors}
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
