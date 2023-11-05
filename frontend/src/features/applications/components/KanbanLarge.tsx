import React, { useState } from 'react';

import Column from './Column';
import FilterBar from './FilterBar';
import COLUMNS from '../CONSTANTS';
import useFilterApps from '../useFilterApps';

function KanbanLarge() {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    contractType: '',
    location: '',
    tags: [],
  });
  const apps = useFilterApps(formData);

  return (
    <div className="kanban-large">
      <FilterBar formData={formData} setFormData={setFormData} />
      <div className="col-ctn">
        {
          COLUMNS.map((col) => (
            <Column
              columnData={col}
              apps={apps.filter((app) => app.status === col.id)}
              key={col.id}
              isMobile={false}
            />
          ))
        }
      </div>
    </div>
  );
}

export default KanbanLarge;
