import React, { useState } from 'react';

import AddForm from './AddForm';

function AddApplication() {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className="add-application">
      <button type="button" onClick={() => setOpenForm(true)}>
        Ajouter
      </button>
      {openForm && <AddForm setOpenForm={setOpenForm} />}
    </div>
  );
}

export default AddApplication;
