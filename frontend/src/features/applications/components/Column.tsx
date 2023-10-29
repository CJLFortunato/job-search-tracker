import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Appcard from './AppCard';
import { ColumnProps } from '../types';

function Column(props: ColumnProps) {
  const { columnData, apps } = props;
  console.log(Math.floor(Math.random() * 100));
  return (
    <section>
      <h2>{columnData.label}</h2>
      {
        <Droppable droppableId={`${columnData.id}-${Math.floor(Math.random() * 100)}`}>
          {
            (provided, snapshot) => (
              <div
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ backgroundColor: snapshot.isDraggingOver ? '#FFFFCC' : 'white' }}
              >
                {
                  apps?.map((app, i) => (
                    <Appcard
                      app={app}
                      key={`${app._id}-${Math.floor(Math.random() * 100)}`}
                      index={i}
                    />
                  ))
                }
                {provided.placeholder}
              </div>
            )
          }
        </Droppable>
      }
    </section>
  );
}

export default Column;
