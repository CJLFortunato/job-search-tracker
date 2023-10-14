import React, { useState } from 'react';

import { AppCardProps } from '../types';

function Appcard(props: AppCardProps) {
  const { app } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="app-card-ctn">
      <div
        className="app-card"
        onClick={() => setOpen(true)}
        onKeyDown={() => setOpen(true)}
        role="button"
        tabIndex={0}
      >
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
      {
      open && (
        <div className="app-details">
          <article>
            <button type="button" onClick={() => setOpen(false)}>X</button>
            <h3>
              <a href={app.jobLink}>{app.jobTitle}</a>
              {' - '}
              <a href={app.companyLink}>{app.companyName}</a>
            </h3>
            <ul>
              <li>
                Type de contrat:
                {app.contractType}
              </li>
              <li>
                Localisation:
                {app.location}
              </li>
              <li>
                Contact:
                {app.contactName || 'Pas de contact'}
              </li>
              <li>
                Type d&apos;application:
                {app.appType}
              </li>
              <li>
                Lettre de motivation obligatoire:
                {app.coverLetter ? 'Oui' : 'Non'}
              </li>
              <li>
                Annonce sauvegardée le:
                {new Date(app.createdAt || '').toLocaleDateString()}
              </li>
            </ul>
          </article>
        </div>
      )
      }
    </div>
  );
}

export default Appcard;
