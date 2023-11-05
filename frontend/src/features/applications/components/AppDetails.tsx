import React from 'react';

import DeleteButton from './DeleteButton';
import EditApp from './EditApp';
import SelectStep from './stepComponents/SelectStep';
import { AppDetailsProps } from '../types';

function AppDetails(props: AppDetailsProps) {
  const { app, setOpen } = props;
  console.log('open');
  return (
    <dialog className="app-details">
      <article>
        <SelectStep application={app} />
        <EditApp app={app} />
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
          <li>
            {
              app.tags.map((tag) => <p key={tag._id}>{tag.label}</p>)
            }
          </li>
        </ul>
      </article>
    </dialog>
  );
}

export default AppDetails;
