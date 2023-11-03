import React, { useState } from 'react';

import useTags from 'features/tags/useTags';

import { AddFormProps, ApplicationCreate, ApplicationUpdate } from '../types';
import useApps from '../useApps';

function AddForm(props: AddFormProps) {
  const { setOpenForm, isUpdate, app } = props;
  const { createApp, updateApp } = useApps();
  const cleanForm = {
    user: app?.user || '',
    jobTitle: app?.jobTitle || '',
    companyName: app?.companyName || '',
    contractType: app?.contractType || '',
    jobLink: app?.jobLink || '',
    companyLink: app?.companyLink || '',
    appType: app?.appType || '',
    location: app?.location || '',
    contactName: app?.contactName || '',
    coverLetter: app?.coverLetter || false,
    status: app?.status || 0,
    tags: app?.tags.map((t) => t._id) || [],
  };
  const { tags } = useTags();
  const [formData, setFormData] = useState<ApplicationCreate>(cleanForm);
  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    if (name === 'coverLetter') {
      setFormData({
        ...formData,
        coverLetter: value === 'true',
      });
      return;
    }
    if (name === 'tags') {
      setFormData({
        ...formData,
        tags: [...formData.tags, value],
      });
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };
  React.useEffect(() => {
    console.log(formData.tags);
  }, [formData]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      !formData.jobTitle
      || !formData.companyName
      || !formData.location
      || !formData.contractType
    ) {
      return;
    }

    if (isUpdate) {
      const updatedApp: ApplicationUpdate = {
        ...formData,
        _id: app?._id || '',
        tags: app
          ? [...app.tags.map((t) => t._id), ...formData.tags]
          : formData.tags
      };
      updateApp(updatedApp);
    }

    createApp(formData);
    setOpenForm(false);
    setFormData(cleanForm);
  };

  const handleCancel = () => {
    setOpenForm(false);
    setFormData(cleanForm);
  };
  return (
    <dialog className="add-form">
      <form onSubmit={handleSubmit}>
        <div className="grid-ctn">
          <label htmlFor="jobTitle">
            Intitulé du poste
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              required
              onChange={handleChange}
              value={formData.jobTitle}
            />
          </label>
          <label htmlFor="companyName">
            Nom de l&apos;entreprise
            <input
              type="text"
              id="companyName"
              name="companyName"
              required
              onChange={handleChange}
              value={formData.companyName}
            />
          </label>
          <label htmlFor="contractType">
            Type de contrat
            <select
              name="contractType"
              id="contractType"
              required
              onChange={handleChange}
              value={formData.contractType}
            >
              <option value="" disabled>Sélectionnez un type de contrat</option>
              <option value="cdi">CDI</option>
              <option value="cdd">CDD</option>
              <option value="stage">Stage</option>
              <option value="alternance">Alternance</option>
              <option value="interim">Intérim</option>
              <option value="autre">Autre</option>
            </select>
          </label>
          <label htmlFor="jobLink">
            Lien vers l&apos;annonce
            <input
              type="text"
              id="jobLink"
              name="jobLink"
              onChange={handleChange}
              value={formData.jobLink}
            />
          </label>
          <label htmlFor="companyLink">
            Lien vers le site de l&apos;entreprise
            <input
              type="text"
              id="companyLink"
              name="companyLink"
              onChange={handleChange}
              value={formData.companyLink}
            />
          </label>
          <label htmlFor="appType">
            Type d&apos;application
            <input
              type="text"
              id="appType"
              name="appType"
              onChange={handleChange}
              value={formData.appType}
            />
          </label>
          <label htmlFor="location">
            Localisation
            <input
              type="text"
              id="location"
              name="location"
              required
              onChange={handleChange}
              value={formData.location}
            />
          </label>
          <label htmlFor="contactName">
            Nom du contact
            <input
              type="text"
              id="contactName"
              name="contactName"
              onChange={handleChange}
              value={formData.contactName || ''}
            />
          </label>
          <label htmlFor="tags">
            Tags
            <select
              name="tags"
              id="tags"
              required
              onChange={handleChange}
              value={formData.tags}
              multiple
            >
              <option value="" disabled>Sélectionnez des tags</option>
              {
                tags.map((tag) => <option value={tag._id} key={tag._id}>{tag.label}</option>)
              }
            </select>
          </label>
        </div>
        <div className="radio-ctn">
          <p>Lettre de motivation obligatoire</p>
          <label htmlFor="coverLetterTrue">
            Oui
            <input
              checked={formData.coverLetter}
              type="radio"
              id="coverLetterTrue"
              name="coverLetter"
              onChange={handleChange}
              value="true"
            />
          </label>
          <label htmlFor="coverLetterFalse">
            Non
            <input
              checked={!formData.coverLetter}
              type="radio"
              id="coverLetterFalse"
              name="coverLetter"
              onChange={handleChange}
              value=""
            />
          </label>
        </div>
        <button type="submit">Ajouter</button>
        <button type="button" onClick={handleCancel}>Annuler</button>
      </form>
    </dialog>
  );
}

export default AddForm;
