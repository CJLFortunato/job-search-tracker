import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { commonStepForm } from 'features/applications/apps.schemas';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function FollowUpStep(props: StepsProps) {
  const { application, setOpenDialog } = props;
  const initForm = {
    date: '',
    type: '',
  };
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initForm);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<any>('');

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    setError('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { error: err } = commonStepForm.validate(formData);
    if (err) {
      setError(err);
      return;
    }
    const updatedStep = application.steps?.followUp
      ? [...application.steps.followUp]
      : [formData];
    dispatch(updateApps({
      ...application,
      status: 2,
      steps: {
        ...application.steps,
        followUp: updatedStep,
      },
      tags: application.tags.map((t) => t._id),
    }));
    setOpen(false);
    if (setOpenDialog) setOpenDialog(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="select-option"
      >
        J&apos;ai relancé
      </button>
      {open && (
        <div className="modal">
          <h2>Informations de relance</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">
              Date à laquelle vous avez relancé
              <input
                type="date"
                name="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className={
                  error.details?.find((err: any) => err.path?.find((el: any) => el === 'email'))
                    ? 'error-input'
                    : ''
                }
              />
            </label>
            <label htmlFor="type">
              Par quelle voie vous avez relancé
              <select
                name="type"
                id="type"
                value={formData.type}
                onChange={handleChange}
                className={
                  error.details?.find((err: any) => err.path?.find((el: any) => el === 'type'))
                    ? 'error-input'
                    : ''
                }
              >
                <option value="">Comment avez vous relancé ?</option>
                <option value="form">Formulaire de contact</option>
                <option value="email">Email</option>
                <option value="phone">Téléphone</option>
                <option value="social">Réseaux sociaux</option>
                <option value="in person">En personne</option>
              </select>
            </label>
            {
              error && (
                <div className="error-ctn">
                  {error.details?.map((e: any) => e.message)}
                </div>
              )
            }
            <button type="submit">Valider</button>
            <button type="button" onClick={() => setOpen(false)}>Annuler</button>
          </form>
        </div>
      )}
    </>
  );
}

export default FollowUpStep;
