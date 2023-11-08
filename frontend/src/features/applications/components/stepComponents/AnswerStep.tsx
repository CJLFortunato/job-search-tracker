import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function AnswerStep(props: StepsProps) {
  const { application, setOpenDialog } = props;
  const initForm = {
    date: '',
    outcome: '',
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

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="select-option"
      >
        Réponse de l&apos;entreprise
      </button>
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
              <select name="answer" id="answer" value={formData.outcome} onChange={handleChange}>
                <option value="">Réponse</option>
                <option value="yes">Candidature acceptée</option>
                <option value="no">Candidature rejetée</option>
                <option value="noanswer">Aucune réponse</option>
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

export default AnswerStep;
