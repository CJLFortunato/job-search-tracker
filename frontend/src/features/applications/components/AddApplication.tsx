import React, { useState } from 'react';

import AddForm from './AddForm';

function AddApplication() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="add-application">
      <button type="button" onClick={() => setOpenForm(true)}>
        <i className="fa-regular fa-square-plus" />
        Ajouter
      </button>
      {openForm && <AddForm setOpenForm={setOpenForm} />}
    </div>
  );
}

export default AddApplication;
