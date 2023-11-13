import React, { useState } from 'react';

import SelectTags from 'features/tags/components/SelectTags';
import { Tag } from 'features/tags/types';
import useTags from 'features/tags/useTags';

import { FilterBarProps } from '../types';

function FilterBar(props: FilterBarProps) {
  const {
    formData,
    setFormData,
  } = props;

  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectTags = (tag: Tag) => {
    if (formData.tags.includes(tag._id)) {
      const newTags = formData.tags.filter((t) => t !== tag._id);
      setFormData({
        ...formData,
        tags: newTags,
      });
      return;
    }
    setFormData({
      ...formData,
      tags: [...formData.tags, tag._id],
    });
  };

  const { tags } = useTags();
  return (
    <div className="filter-bar">
      <button type="button" onClick={() => setOpen((prev) => !prev)}>
        <i className="fa-solid fa-filter" />
        Filtres
      </button>
      {
        open && (
          <form>
            <label htmlFor="jobTitle">
              Intitulé de poste
              <input type="text" name="jobTitle" id="jobTitle" onChange={handleChange} />
            </label>
            <label htmlFor="companyName">
              Nom de l&apos;entreprise
              <input type="text" name="companyName" id="companyName" onChange={handleChange} />
            </label>
            <label htmlFor="contractType">
              Type de contrat
              <input type="text" name="contractType" id="contractType" onChange={handleChange} />
            </label>
            <label htmlFor="location">
              Localisation
              <input type="text" name="location" id="location" onChange={handleChange} />
            </label>
            Tags
            <SelectTags tags={tags} selectedTags={formData.tags} handleSelect={handleSelectTags} />
          </form>
        )
      }
    </div>
  );
}

export default FilterBar;
