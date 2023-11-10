import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useDocumentTitle from 'common/useDocumentTitle';
import UserProfile from 'features/user/components/Userprofile';
import useUser from 'features/user/useUser';

import PAGE_TITLE from './CONSTANTS';

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();
  useDocumentTitle(`${PAGE_TITLE}Votre profil`);

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
