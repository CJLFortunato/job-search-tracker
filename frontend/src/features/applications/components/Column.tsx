import React from 'react';

import StrictModeDroppable from 'components/StrictModeDroppable';

import Appcard from './AppCard';
import { ColumnProps } from '../types';

function Column(props: ColumnProps) {
  const { columnData, apps, isMobile } = props;
  return (
    <section>
      <h2>{columnData.label}</h2>
      {isMobile
        ? (
          <div className="column-ctn">
            {
              apps?.map((app, i) => (
                <Appcard
                  app={app}
                  key={`${app._id}-${Math.floor(Math.random() * 100)}`}
                  index={i}
                  isMobile={isMobile}
                />
              ))
            }
          </div>
        )
        : (
          <StrictModeDroppable droppableId={columnData.id.toString()}>
            {
              (provided, snapshot) => (
                <div
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    backgroundColor: snapshot.isDraggingOver
                      ? 'hsla(207, 53%, 67%, 0.4)'
                      : 'transparent',
                    width: '100%',
                  }}
                >
                  {
                    apps?.map((app, i) => (
                      <Appcard
                        app={app}
                        key={`${app._id}-${Math.floor(Math.random() * 100)}`}
                        index={i}
                        isMobile={isMobile}
                      />
                    ))
                  }
                  {provided.placeholder}
                </div>
              )
            }
          </StrictModeDroppable>
        )}
    </section>
  );
}

export default Column;
