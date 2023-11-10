import React, { useState } from 'react';

import addTagForm from '../tags.schemas';
import useTags from '../useTags';

function CreateTag() {
  const [tags, setTags] = useState('');
  const [error, setError] = useState<any>('');
  const { createTagsFunction } = useTags();

  const handleChange = (e: any) => {
    const { target: { value } } = e;
    setError('');
    setTags(value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { error: err } = addTagForm.validate(tags);

    if (err) {
      setError(err);
      return;
    }
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
        <input
          type="text"
          name="tags"
          id="tag"
          value={tags}
          onChange={handleChange}
          className={
            error
              ? 'error-input'
              : ''
          }
        />
      </label>
      <button type="submit">+</button>
      {
        error && (
          <div className="error-ctn">
            {error.details?.map((e: any) => e.message)}
          </div>
        )
      }
    </form>
  );
}

export default CreateTag;
