import React from 'react';

import { TagChipProps } from '../types';
import useTags from '../useTags';

function TagChip(props: TagChipProps) {
  const { tag } = props;
  const { deleteTag } = useTags();
  return (
    <p className="tag-chip">
      {tag.label}
      <button type="button" onClick={() => deleteTag(tag._id)}>
        <i className="fa-solid fa-xmark" />
      </button>
    </p>
  );
}

export default TagChip;
