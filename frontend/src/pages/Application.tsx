import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppSelector } from 'common/hooks';
import { selectAppById } from 'features/applications/apps.slice';
import AppDetails from 'features/applications/components/AppDetails';

function Application() {
  const { appId } = useParams();
  const app = useAppSelector((state) => selectAppById(state, appId || ''));

  return (
    <div className="page application">
      <Link to="/dashboard">
        <i className="fa-solid fa-arrow-left" />
        Tableau de bord
      </Link>
      <AppDetails app={app} setOpen={() => undefined} />
    </div>
  );
}

export default Application;
