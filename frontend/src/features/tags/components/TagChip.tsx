import React from 'react';

import { TagChipProps } from '../types';
import useTags from '../useTags';

function TagChip(props: TagChipProps) {
  const { tag, canDelete = true } = props;
  const { deleteTag } = useTags();
  return (
    <div className="tag-chip">
      <span>{tag.label}</span>
      {
        canDelete && (
          <button type="button" onClick={() => deleteTag(tag._id)}>
            <i className="fa-solid fa-xmark" />
          </button>
        )
      }
    </div>
  );
}

export default TagChip;
