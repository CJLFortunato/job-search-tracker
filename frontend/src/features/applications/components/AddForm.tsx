import React, { useState } from 'react';

import { AddFormProps } from '../types';
import useApps from '../useApps';

function AddForm(props: AddFormProps) {
  const { setOpenForm } = props;
  const { createApp } = useApps();
  const cleanForm = {
    user: '',
    jobTitle: '',
    companyName: '',
    contractType: '',
    jobLink: '',
    companyLink: '',
    appType: '',
    location: '',
    contactName: '',
    coverLetter: false,
    status: 0,
    tags: [],
  };
  const [formData, setFormData] = useState(cleanForm);
  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
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
  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (
      !formData.jobTitle
      || !formData.companyName
      || !formData.location
      || !formData.contractType
    ) {
      return;
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
    <div className="add-form">
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
              <option value="">Sélectionnez un type de contrat</option>
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
              value={formData.contactName}
            />
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
    </div>
  );
}

export default AddForm;
