import React from 'react';

import TagChip from './TagChip';
import { DisplayTagsProps } from '../types';

function DisplayTags(props: DisplayTagsProps) {
  const { tags } = props;

  return (
    <div className="tags-ctn">
      {
        tags.map((tag) => <TagChip tag={tag} key={tag._id} />)
      }
    </div>
  );
}

export default DisplayTags;
