import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserForm from '../features/user/components/UserForm';
import useUser from '../features/user/useUser';

function Login() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);
  return (
    <div className="page login">
      <h1>Se connecter</h1>
      <UserForm isLogin />
    </div>
  );
}

export default Login;
