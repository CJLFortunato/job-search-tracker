import React from 'react';

import { AppCardProps } from '../types';

function Appcard(props: AppCardProps) {
  const { app } = props;
  return (
    <section>
      <div className="app-card">
        <h3>{app.jobTitle}</h3>
      </div>
    </section>
  );
}

export default Appcard;
