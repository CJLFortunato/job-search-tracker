import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function AnswerStep(props: StepsProps) {
  const { application } = props;
  const initForm = {
    date: '',
    answer: ''
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

  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(updateApps({
      ...application,
      status: 4,
      steps: {
        ...application.steps,
        answer: formData
      }
    }));
    setOpen(false);
  };

  return (
    <>
      <option
        value="apply"
        onClick={() => setOpen(true)}
        selected={application.status === 4}
      >
        Réponse de l&apos;entreprise
      </option>
      {open && (
        <div className="modal">
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
              />
            </label>
            <label htmlFor="answer">
              Réponse
              <select name="answer" id="answer" value={formData.answer} onChange={handleChange}>
                <option value="">Réponse</option>
                <option value="yes">Candidature acceptée</option>
                <option value="no">Candidature rejetée</option>
                <option value="noanswer">Aucune réponse</option>
              </select>
            </label>
            <button type="submit">Valider</button>
          </form>
        </div>
      )}
    </>
  );
}

export default AnswerStep;
