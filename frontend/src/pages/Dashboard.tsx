import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import KanbanLarge from '../features/applications/components/KanbanLarge';
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
      <KanbanLarge />
    </div>
  );
}

export default Dashboard;
