import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import UserForm from 'features/user/components/UserForm';
import useUser from 'features/user/useUser';

function Login() {
  const { user, error } = useUser();

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
