import React from 'react';

import { AppCardProps } from '../types';

function Appcard(props: AppCardProps) {
  const { app } = props;
  return (
    <div className="app-card">
      <h3>
        {app.jobTitle}
        {' - '}
        {app.companyName}
      </h3>
      <ul>
        <li>{app.contractType}</li>
        <li>{app.location}</li>
        <li>{new Date(app.createdAt || '').toLocaleDateString()}</li>
      </ul>
    </div>
  );
}

export default Appcard;
