import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import AddApplication from 'features/applications/components/AddApplication';
import KanbanCarousel from 'features/applications/components/KanbanCarousel';
import KanbanLarge from 'features/applications/components/KanbanLarge';
import useApps from 'features/applications/useApps';
import ManageTags from 'features/tags/components/ManageTags';
import useTags from 'features/tags/useTags';
import useUser from 'features/user/useUser';

function Dashboard() {
  const { user, error: userError } = useUser();
  const { error: appError } = useApps();
  const { error: tagError } = useTags();

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  useEffect(() => {
    if (userError) toast.error(userError, { theme: 'colored' });
    if (appError) toast.error(appError, { theme: 'colored' });
    if (tagError) toast.error(tagError, { theme: 'colored' });
  }, [userError, appError, tagError]);

  return (
    <div className="page dashboard">
      <div className="btn-ctn">
        <AddApplication />
        <ManageTags />
      </div>
      <h1>Vos candidatures</h1>
      <KanbanLarge />
      <KanbanCarousel />
    </div>
  );
}

export default Dashboard;
