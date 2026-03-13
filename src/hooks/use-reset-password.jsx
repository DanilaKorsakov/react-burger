import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { sendEmail } from '@utils/api.js';

export const useResetPassword = (values) => {
  const navigate = useNavigate();

  const [response, setResponse] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setResponse(await sendEmail(values));
  }

  useEffect(() => {
    if (response && response.success) navigate('/reset-password');
  }, [response]);

  return { handleSubmit, response };
};
