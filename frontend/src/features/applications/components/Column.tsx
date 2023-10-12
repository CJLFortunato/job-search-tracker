import React from 'react';

import Appcard from './AppCard';
import { ColumnProps } from '../types';

function Column(props: ColumnProps) {
  const { columnData, apps } = props;
  return (
    <section>
      <h2>{columnData.label}</h2>
      {
        apps?.map((app) => <Appcard app={app} key={app.id} />)
      }
    </section>
  );
}

export default Column;
