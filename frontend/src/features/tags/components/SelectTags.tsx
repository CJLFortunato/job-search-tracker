import React from 'react';

import { SelectTagsProps } from '../types';

function SelectTags(props: SelectTagsProps) {
  const { tags, selectedTags, handleSelect } = props;
  const sortedTags = [...tags].sort((a, b) => {
    if (selectedTags.includes(a._id) && !selectedTags.includes(b._id)) return -1;
    if (!selectedTags.includes(a._id) && selectedTags.includes(b._id)) return 1;
    return 0;
  });

  return (
    <div className="select-tags">
      {
        sortedTags.map((tag) => (
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
