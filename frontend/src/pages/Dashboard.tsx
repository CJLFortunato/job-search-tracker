import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AddApplication from '../features/applications/components/AddApplication';
import KanbanCarousel from '../features/applications/components/KanbanCarousel';
import KanbanLarge from '../features/applications/components/KanbanLarge';
import ManageTags from 'features/tags/components/ManageTags';
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
      <div className="btn-ctn">
        <AddApplication />
        <ManageTags />
      </div>
      <KanbanLarge />
      <KanbanCarousel />
    </div>
  );
}

export default Dashboard;
