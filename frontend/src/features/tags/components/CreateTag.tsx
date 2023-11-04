import React, { useState } from 'react';

import useTags from '../useTags';

function CreateTag() {
  const [tags, setTags] = useState('');
  const { createTagsFunction } = useTags();

  const handleChange = (e: any) => {
    const { target: { value } } = e;
    setTags(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newTagsArray = tags.split(' ').map((newTag) => ({
      label: newTag,
      applications: [],
    }));
    createTagsFunction(newTagsArray);
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="tag">
        Saisissez vos tags ici, en les séparant par un espace
        <input type="text" name="tags" id="tag" value={tags} onChange={handleChange} />
      </label>
      <button type="submit">+</button>
    </form>
  );
}

export default CreateTag;
