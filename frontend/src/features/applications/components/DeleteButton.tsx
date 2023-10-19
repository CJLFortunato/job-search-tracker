import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';

import { deleteApps } from '../apps.slice';
import { DeleteButtonProps } from '../types';

function DeleteButton(props: DeleteButtonProps) {
  const { id } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteApps({ id }));
  };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>Supprimer</button>
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
