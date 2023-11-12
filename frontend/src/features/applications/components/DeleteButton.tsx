import React, { useState } from 'react';

import { DeleteButtonProps } from '../types';
import useApps from '../useApps';

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { deleteApp } = useApps();

  const handleDelete = () => {
    deleteApp(id);
  };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-xmark" />
        <span>Supprimer</span>
      </button>
      {open && (
        <dialog className="modal-delete">
          <p>Êtes-vous sûr(e) de vouloir supprimer cette candidature ?</p>
          <p className="alert">Vous ne pourrez pas revenir en arrière!</p>
          <div className="btn-ctn">
            <button type="button" onClick={handleDelete}>Supprimer</button>
            <button type="button" onClick={() => setOpen(false)}>Annuler</button>
          </div>
        </dialog>
      )}
    </>
  );
}

export default DeleteButton;
