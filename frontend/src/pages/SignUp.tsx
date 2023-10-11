import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserForm from '../features/user/components/UserForm';
import useUser from '../features/user/useUser';

function SignUp() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);
  return (
    <div className="page signup">
      <h1>S&apos;inscrire</h1>
      <UserForm isLogin={false} />
    </div>
  );
}

export default SignUp;
