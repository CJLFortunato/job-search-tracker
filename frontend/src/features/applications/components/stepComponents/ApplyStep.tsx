import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { commonStepForm } from 'features/applications/apps.schemas';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function ApplyStep(props: StepsProps) {
  const { application, setOpenDialog, openOverride = false } = props;
  const initForm = {
    date: '',
    type: '',
  };
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initForm);
  const [open, setOpen] = useState(openOverride);
  const [error, setError] = useState<any>('');

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    setError('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  console.log(application);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { error: err } = commonStepForm.validate(formData);
    if (err) {
      setError(err);
      return;
    }
    dispatch(updateApps({
      ...application,
      status: 1,
      steps: {
        ...application.steps,
        apply: formData,
      },
      tags: application.tags.map((t) => t._id),
    }));
    setOpen(false);
    if (setOpenDialog) setOpenDialog(false);
  };

  const handleCancel = () => {
    if (setOpenDialog) setOpenDialog(false);
    setOpen(false);
  };

  return (
    <>
      {
        !openOverride && (
          <button
            onClick={() => setOpen(true)}
            type="button"
            className="select-option"
          >
            J&apos;ai postulé
          </button>
        )
      }
      {open && (
        <div className="modal step">
          <h2>Informations de candidature</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">
              Date à laquelle vous avez candidaté
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
              Comment vous avez candidaté
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
                <option value="">Comment avez vous candidaté ?</option>
                <option value="form">Formulaire du site</option>
                <option value="email">Email</option>
                <option value="phone">Téléphone</option>
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
            <div className="btn-ctn">
              <button type="submit">Valider</button>
              <button type="button" onClick={handleCancel}>Annuler</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default ApplyStep;
