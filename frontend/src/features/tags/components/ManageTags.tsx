import React, { useState } from 'react';

import CreateTag from './CreateTag';
import DisplayTags from './DisplayTags';
import useTags from '../useTags';

function ManageTags() {
  const [open, setOpen] = useState<boolean>(false);
  const { tags } = useTags();
  return (
    <div>
      <button type="button" onClick={() => setOpen(true)}>
        <i className="fa-solid fa-tags" />
        Gérer les tags
      </button>
      {
        open
        && (
          <dialog className="manage-tags">
            <CreateTag />
            <DisplayTags tags={tags} />
            <button type="button" onClick={() => setOpen(false)}>Fermer</button>
          </dialog>
        )
      }
    </div>
  );
}

export default ManageTags;
