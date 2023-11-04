import React from 'react';

import { SelectTagsProps } from '../types';

function SelectTags(props: SelectTagsProps) {
  const { tags, selectedTags, handleSelect } = props;
  return (
    <div className="select-tags">
      {
        tags.map((tag) => (
          <button
            type="button"
            className={selectedTags.includes(tag._id) ? 'tag-btn-active' : 'tag-btn'}
            onClick={() => handleSelect(tag)}
            key={tag._id}
          >
            {tag.label}
          </button>
        ))
      }
    </div>
  );
}

export default SelectTags;
