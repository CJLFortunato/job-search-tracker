import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useUser from '../features/user/useUser';

function Dashboard() {
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);
  return (
    <div className="page dashboard">
      <h1>Vos candidatures</h1>
    </div>
  );
}

export default Dashboard;
