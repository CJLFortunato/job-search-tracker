import React from 'react';

import TagChip from 'features/tags/components/TagChip';

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
        <div className="actions-ctn">
          <SelectStep application={app} />
          <EditApp app={app} />
          <DeleteButton id={app._id || ''} />
          <button type="button" onClick={() => setOpen(false)}>X</button>
        </div>
        <h3>
          <a href={app.jobLink}>{app.jobTitle}</a>
          {' - '}
          <a href={app.companyLink}>{app.companyName}</a>
        </h3>
        <ul>
          <li>
            {
              app.tags.map((tag) => <TagChip key={tag._id} tag={tag} />)
            }
          </li>
          <li>
            <strong>Type de contrat: </strong>
            {app.contractType}
          </li>
          <li>
            <strong>Localisation: </strong>
            {app.location}
          </li>
          <li>
            <strong>Contact: </strong>
            {app.contactName || 'Pas de contact'}
          </li>
          <li>
            <strong>Type d&apos;application: </strong>
            {app.appType}
          </li>
          <li>
            <strong>Lettre de motivation obligatoire: </strong>
            {app.coverLetter ? 'Oui' : 'Non'}
          </li>
          <li>
            <strong>Annonce sauvegardée le: </strong>
            {new Date(app.createdAt || '').toLocaleDateString()}
          </li>
        </ul>
      </article>
    </dialog>
  );
}

export default AppDetails;
