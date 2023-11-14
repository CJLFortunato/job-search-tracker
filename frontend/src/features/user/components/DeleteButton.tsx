import React from 'react';

import { DeleteButtonProps } from '../types';
import useUser from '../useUser';

function DeleteButton(props: DeleteButtonProps) {
  const { id, setOpen } = props;
  const { deleteUsers } = useUser();

  const handleDelete = () => {
    deleteUsers(id);
  };
  return (
    <div className="modal-delete">
      <p>Êtes-vous sûr(e) de vouloir supprimer votre compte ?</p>
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
    </div>
  );
}

export default DeleteButton;
