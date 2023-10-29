import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import DeleteButton from './DeleteButton';
import SelectStep from './stepComponents/SelectStep';
import { AppCardProps } from '../types';

function Appcard(props: AppCardProps) {
  const { app, index } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="app-card-ctn">
      <Draggable draggableId={app._id || app.jobTitle} index={index}>
        {(provided, snapshot) => (
          <div
            className="app-card"
            onClick={() => setOpen(true)}
            onKeyDown={() => setOpen(true)}
            role="button"
            tabIndex={0}
            ref={provided.innerRef}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.draggableProps}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? '#FFFFCC' : 'white',
              ...provided.draggableProps.style,
            }}
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
        )}
      </Draggable>
      {
        open && (
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
        )
      }
    </div>
  );
}

export default Appcard;
