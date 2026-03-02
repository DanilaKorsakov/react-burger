import { useEffect, useRef, useState } from 'react';

import { UserProfileForm } from '@components/user-profile-form/user-profile-form.jsx';

export const ProfilePage = () => {
  const ref = useRef(null);
  const [isDisabled, setIsDisabled] = useState(true);

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

  function handleClick() {
    setIsDisabled(!isDisabled);
  }

  return (
    <>
      <UserProfileForm onClick={handleClick} ref={ref} isDisabled={isDisabled} />
    </>
  );
};
