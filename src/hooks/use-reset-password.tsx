import { type FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendEmail } from '@utils/api.ts';

import type { TResponseWithoutUserInfo } from '@utils/types.ts';

type useResetPasswordValues = {
  email: string;
};

type useResetPasswordResult = {
  handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
  response: TResponseWithoutUserInfo | null;
};

export const useResetPassword = (
  values: useResetPasswordValues
): useResetPasswordResult => {
  const navigate = useNavigate();

  const [response, setResponse] = useState<TResponseWithoutUserInfo | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setResponse(await sendEmail(values));
  }

  useEffect(() => {
    if (response && response.success) navigate('/reset-password');
  }, [response]);

  return { handleSubmit, response };
};
