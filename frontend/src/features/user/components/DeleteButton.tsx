import React, { useState } from 'react';

import { DeleteButtonProps } from '../types';
import useUser from '../useUser';

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const { deleteUsers } = useUser();

  const handleDelete = () => {
    deleteUsers(id);
  };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Supprimer</button>
      {open && (
        <div className="modal">
          <p>Êtes-vous sûr(e) de vouloir supprimer votre compte ?</p>
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
