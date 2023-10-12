import React, { useState } from 'react';

import Column from './Column';
import COLUMNS from '../CONSTANTS';
import useApps from '../useApps';

function KanbanCarousel() {
  const { apps } = useApps();
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (newIndex: number) => {
    let updatedIndex = newIndex;

    if (newIndex < 0) {
      updatedIndex = COLUMNS.length - 1;
    } else if (newIndex >= COLUMNS.length) {
      updatedIndex = 0;
    }

    setActiveIndex(updatedIndex);
  };
  return (
    <div className="kanban-carousel">
      <button onClick={() => updateIndex(activeIndex - 1)} type="button">
        <i className="fa-solid fa-angle-left" />
        {'<'}
      </button>
      <div className="carousel">
        <div className="inner" style={{ transform: `translateX(-${activeIndex * 20}%)` }}>
          {
            COLUMNS.map((col) => <Column columnData={col} apps={apps} key={col.id} />)
          }
        </div>
      </div>
      <button onClick={() => updateIndex(activeIndex + 1)} type="button">
        <i className="fa-solid fa-angle-right" />
        {'>'}
      </button>
    </div>
  );
}

export default KanbanCarousel;
