import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useDocumentTitle from 'common/useDocumentTitle';
import UserForm from 'features/user/components/UserForm';
import useUser from 'features/user/useUser';

import PAGE_TITLE from './CONSTANTS';

function Login() {
  const { user, error } = useUser();
  useDocumentTitle(`${PAGE_TITLE}Connectez vous`);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  useEffect(() => {
    if (error) toast.error(error, { theme: 'colored' });
  }, [error]);

  return (
    <div className="page login">
      <h1>Se connecter</h1>
      <UserForm isLogin />
    </div>
  );
}

export default Login;
