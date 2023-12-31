import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { commonStepForm } from 'features/applications/apps.schemas';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function InterviewStep(props: StepsProps) {
  const { application, setOpenDialog, setOpen } = props;
  const initForm = {
    date: '',
    type: '',
  };
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initForm);
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
    const updatedStep = application.steps?.interview
      ? [...application.steps.interview, formData]
      : [formData];
    dispatch(updateApps({
      ...application,
      status: 3,
      steps: {
        ...application.steps,
        interview: updatedStep,
      },
      tags: application.tags.map((t) => t._id),
    }));
    if (setOpen) setOpen(false);
    if (setOpenDialog) setOpenDialog(false);
  };

  const handleCancel = () => {
    if (setOpenDialog) setOpenDialog(false);
    if (setOpen) setOpen(false);
  };

  return (
    <div className="modal step">
      <h2>Informations sur l&apos;entretien</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="date">
          Date à laquelle l&apos;entretien a eu lieu
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
          Type d&apos;entretien
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
            <option value="">type d&apos;entretien ?</option>
            <option value="video">Visioconférence</option>
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
          <button type="button" onClick={handleCancel} className="cancel-btn">Annuler</button>
        </div>
      </form>
    </div>
  );
}

export default InterviewStep;
