import React from 'react';

import { DeleteButtonProps } from '../types';
import useApps from '../useApps';

function DeleteButton(props: DeleteButtonProps) {
  const { id, setOpen } = props;
  const { deleteApp } = useApps();

  const handleDelete = () => {
    deleteApp(id);
  };
  return (
    <dialog className="modal-delete">
      <p>Êtes-vous sûr(e) de vouloir supprimer cette candidature ?</p>
      <p className="alert">Vous ne pourrez pas revenir en arrière!</p>
      <div className="btn-ctn">
        <button type="button" onClick={handleDelete} className="delete-btn">Supprimer</button>
        <button
          type="button"
          onClick={() => { if (setOpen) setOpen(false); }}
          className="cancel-btn"
        >
          Annuler
        </button>
      </div>
    </dialog>
  );
}

export default DeleteButton;
