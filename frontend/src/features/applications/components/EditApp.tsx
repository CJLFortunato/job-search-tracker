import React, { useState } from 'react';

import AddForm from './AddForm';
import { EditAppProps } from '../types';

function EditApp(props: EditAppProps) {
  const { app } = props;
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="add-application">
      <button type="button" onClick={() => setOpenForm(true)}>
        <i className="fa-solid fa-pen" />
        Modifier
      </button>
      {openForm && <AddForm setOpenForm={setOpenForm} isUpdate app={app} />}
    </div>
  );
}

export default EditApp;
