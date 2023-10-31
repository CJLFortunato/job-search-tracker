import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserProfile from 'features/user/components/Userprofile';

import useUser from '../features/user/useUser';

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  return (
    <div className="page">
      <h1>Votre profil</h1>
      <UserProfile />
    </div>
  );
}

export default Profile;
