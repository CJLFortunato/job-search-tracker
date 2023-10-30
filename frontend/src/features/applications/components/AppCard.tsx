import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

import AppDetails from './AppDetails';
import { AppCardProps } from '../types';

function Appcard(props: AppCardProps) {
  const { app, index, isMobile } = props;
  const [open, setOpen] = useState(false);
  return (
    <div className="app-card-ctn">
      {
        isMobile
          ? (
            <div
              className="app-card"
              onClick={() => setOpen(true)}
              onKeyDown={() => setOpen(true)}
              role="button"
              tabIndex={0}
            >
              <h3>
                {app.jobTitle}
              </h3>
              <h4>{app.companyName}</h4>
              <ul>
                <li>{app.contractType}</li>
                <li>{app.location}</li>
                <li>{new Date(app.createdAt || '').toLocaleDateString()}</li>
              </ul>
            </div>
          )
          : (
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
                  </h3>
                  <h4>{app.companyName}</h4>
                  <ul>
                    <li>{app.contractType}</li>
                    <li>{app.location}</li>
                    <li>{new Date(app.createdAt || '').toLocaleDateString()}</li>
                  </ul>
                </div>
              )}
            </Draggable>
          )
      }
      {
        open && (
          <AppDetails app={app} setOpen={setOpen} />
        )
      }
    </div>
  );
}

export default Appcard;
