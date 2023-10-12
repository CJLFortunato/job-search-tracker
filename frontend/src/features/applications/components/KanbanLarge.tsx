import React from 'react';

import Column from './Column';
import COLUMNS from '../CONSTANTS';
import useApps from '../useApps';

function KanbanLarge() {
  const { apps } = useApps();
  return (
    <div className="kanban-large">
      {
        COLUMNS.map((col) => <Column columnData={col} apps={apps} key={col.id} />)
      }
    </div>
  );
}

export default KanbanLarge;
