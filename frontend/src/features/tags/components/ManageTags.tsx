import React from 'react';

import CreateTag from './CreateTag';
import DisplayTags from './DisplayTags';
import { ManageTagsProps } from '../types';
import useTags from '../useTags';

function ManageTags({ setOpen }: ManageTagsProps) {
  const { tags } = useTags();
  return (
    <dialog className="manage-tags">
      <CreateTag />
      <DisplayTags tags={tags} />
      <button
        type="button"
        onClick={() => {
          if (setOpen) setOpen(false);
        }}
      >
        Fermer
      </button>
    </dialog>
  );
}

export default ManageTags;
