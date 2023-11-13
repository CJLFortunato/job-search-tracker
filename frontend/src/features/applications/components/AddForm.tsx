import React, { useState } from 'react';

import { addAppForm } from 'features/applications/apps.schemas';
import SelectTags from 'features/tags/components/SelectTags';
import { Tag } from 'features/tags/types';
import useTags from 'features/tags/useTags';

import { AddFormProps, ApplicationCreate, ApplicationUpdate } from '../types';
import useApps from '../useApps';

function AddForm(props: AddFormProps) {
  const { setOpen, isUpdate, app } = props;
  const { createApp, updateApp } = useApps();

  const cleanForm = {
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
  const [error, setError] = useState<any>('');

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    setError('');
    if (name === 'coverLetter') {
      setFormData({
        ...formData,
        coverLetter: value === 'true',
      });
      return;
    }
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

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const { error: err } = addAppForm.validate(formData);
    if (err) {
      setError(err);
      return;
    }

    if (isUpdate) {
      const updatedApp: ApplicationUpdate = {
        ...formData,
        _id: app?._id || '',
        tags: formData.tags,
        user: app?.user || '',
      };
      updateApp(updatedApp);
      return;
    }

    createApp(formData);
    if (setOpen) setOpen(false);
    setFormData(cleanForm);
  };

  const handleCancel = () => {
    if (setOpen) setOpen(false);
    setFormData(cleanForm);
  };
  return (
    <dialog className={isUpdate ? 'update-dialog' : 'add-dialog'}>
      <form onSubmit={handleSubmit} className={isUpdate ? 'update-form' : 'add-form'}>
        <h2>{isUpdate ? 'Modifier votre candidature' : 'Ajouter une candidature'}</h2>
        <p className="tags-label">Tags</p>
        <SelectTags tags={tags} selectedTags={formData.tags} handleSelect={handleSelectTags} />
        <div className="grid-ctn">
          <label htmlFor="jobTitle">
            Intitulé du poste
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              onChange={handleChange}
              value={formData.jobTitle}
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'jobTitle'))
                  ? 'error-input'
                  : ''
              }
            />
          </label>
          <label htmlFor="companyName">
            Nom de l&apos;entreprise
            <input
              type="text"
              id="companyName"
              name="companyName"
              onChange={handleChange}
              value={formData.companyName}
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'companyName'))
                  ? 'error-input'
                  : ''
              }
            />
          </label>
          <label htmlFor="contractType">
            Type de contrat
            <select
              name="contractType"
              id="contractType"
              onChange={handleChange}
              value={formData.contractType}
              className={
                error.details?.find(
                  (err: any) => err.path?.find((el: any) => el === 'contractType'),
                )
                  ? 'error-input'
                  : ''
              }
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
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'jobLink'))
                  ? 'error-input'
                  : ''
              }
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
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'companyLink'))
                  ? 'error-input'
                  : ''
              }
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
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'appType'))
                  ? 'error-input'
                  : ''
              }
            />
          </label>
          <label htmlFor="location">
            Localisation
            <input
              type="text"
              id="location"
              name="location"
              onChange={handleChange}
              value={formData.location}
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'location'))
                  ? 'error-input'
                  : ''
              }
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
              className={
                error.details?.find((err: any) => err.path?.find((el: any) => el === 'contactName'))
                  ? 'error-input'
                  : ''
              }
            />
          </label>
        </div>
        <div className="radio-ctn">
          <p>Lettre de motivation obligatoire</p>
          <div className="label-ctn">
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
        </div>
        {
          error && (
            <div className="error-ctn">
              {error.details?.map((e: any) => e.message)}
            </div>
          )
        }
        <div className="btn-ctn">
          <button type="submit">{isUpdate ? 'Modifier' : 'Ajouter'}</button>
          <button type="button" onClick={handleCancel}>Annuler</button>
        </div>
      </form>
    </dialog>
  );
}

export default AddForm;
