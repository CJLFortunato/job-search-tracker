import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { answerStepForm } from 'features/applications/apps.schemas';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function AnswerStep(props: StepsProps) {
  const { application, setOpenDialog, openOverride = false } = props;
  const initForm = {
    date: '',
    outcome: '',
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { error: err } = answerStepForm.validate(formData);
    if (err) {
      setError(err);
      return;
    }
    dispatch(updateApps({
      ...application,
      status: 4,
      steps: {
        ...application.steps,
        answer: formData,
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
            Réponse de l&apos;entreprise
          </button>
        )
      }
      {open && (
        <div className="modal step">
          <h2>Réponse de l&apos;entreprise</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="date">
              Date de la réponse
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
            <label htmlFor="answer">
              Réponse
              <select
                name="outcome"
                id="outcome"
                value={formData.outcome}
                onChange={handleChange}
                className={
                  error.details?.find((err: any) => err.path?.find((el: any) => el === 'outcome'))
                    ? 'error-input'
                    : ''
                }
              >
                <option value="">Réponse</option>
                <option value="yes">Candidature acceptée</option>
                <option value="no">Candidature rejetée</option>
                <option value="noanswer">Aucune réponse</option>
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

export default AnswerStep;
