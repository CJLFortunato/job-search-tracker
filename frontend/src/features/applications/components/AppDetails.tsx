import React from 'react';

import DeleteButton from './DeleteButton';
import SelectStep from './stepComponents/SelectStep';
import { AppDetailsProps } from '../types';

function AppDetails(props: AppDetailsProps) {
  const { app, setOpen } = props;
  return (
    <div className="app-details">
      <article>
        <SelectStep application={app} />
        <DeleteButton id={app._id || ''} />
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
  );
}

export default AppDetails;
