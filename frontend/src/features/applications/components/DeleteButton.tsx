import React, { useState } from 'react';

import { DeleteButtonProps } from '../types';
import useApps from '../useApps';

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { deleteApp } = useApps();
  console.log(id);
  const handleDelete = () => {
    deleteApp(id);
  };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-xmark" />
        Supprimer
      </button>
      {open && (
        <div className="modal">
          <p>Êtes-vous sûr(e) de vouloir supprimer cette candidature ?</p>
          <p className="alert">Vous ne pourrez pas revenir en arrière!</p>
          <div>
            <button type="button" onClick={handleDelete}>Supprimer</button>
            <button type="button" onClick={() => setOpen(false)}>Annuler</button>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteButton;
