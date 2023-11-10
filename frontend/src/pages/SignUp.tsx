import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useDocumentTitle from 'common/useDocumentTitle';
import UserForm from 'features/user/components/UserForm';
import useUser from 'features/user/useUser';

import PAGE_TITLE from './CONSTANTS';

function SignUp() {
  const { user, error } = useUser();
  const navigate = useNavigate();
  useDocumentTitle(`${PAGE_TITLE}Créez un compte`);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  useEffect(() => {
    if (error) toast.error(error, { theme: 'colored' });
  }, [error]);
  return (
    <div className="page signup">
      <h1>S&apos;inscrire</h1>
      <UserForm isLogin={false} />
    </div>
  );
}

export default SignUp;
