import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function InterviewStep(props: StepsProps) {
  const { application } = props;
  const initForm = {
    date: '',
    type: '',
  };
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState(initForm);
  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const updatedStep = application.steps?.followUp
      ? [...application.steps.followUp]
      : [formData];
    dispatch(updateApps({
      ...application,
      status: 3,
      steps: {
        ...application.steps,
        interview: updatedStep,
      },
    }));
    setOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="select-option"
      >
        J&apos;ai eu un entretien
      </button>
      {open && (
        <div className="modal">
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
              />
            </label>
            <label htmlFor="type">
              Type d&apos;entretien
              <select name="type" id="type" value={formData.type} onChange={handleChange}>
                <option value="">type d&apos;entretien ?</option>
                <option value="form">Visioconférence</option>
                <option value="phone">Téléphone</option>
                <option value="in person">En personne</option>
              </select>
            </label>
            <button type="submit">Valider</button>
            <button type="button" onClick={() => setOpen(false)}>Annuler</button>
          </form>
        </div>
      )}
    </>
  );
}

export default InterviewStep;
