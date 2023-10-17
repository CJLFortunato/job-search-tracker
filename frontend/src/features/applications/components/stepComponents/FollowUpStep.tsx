import React, { useState } from 'react';

import { useAppDispatch } from 'common/hooks';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';

function FollowUpStep(props: StepsProps) {
  const { application } = props;
  const initForm = {
    date: '',
    type: ''
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
    setOpen(false);
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    const updatedStep = application.steps?.followUp
      ? [...application.steps.followUp]
      : [formData];
    dispatch(updateApps({
      ...application,
      status: 2,
      steps: {
        ...application.steps,
        followUp: updatedStep,
      }
    }));
  };

  return (
    <>
      <option
        value="apply"
        onClick={() => setOpen(true)}
        selected={application.status === 2}
      >
        J&apos;ai relancé
      </option>
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
              />
            </label>
            <label htmlFor="type">
              Par quelle voie vous avez relancé
              <select name="type" id="type" value={formData.type} onChange={handleChange}>
                <option value="">Comment avez vous relancé ?</option>
                <option value="form">Formulaire de contact</option>
                <option value="email">Email</option>
                <option value="phone">Téléphone</option>
                <option value="social">Réseaux sociaux</option>
                <option value="in person">En personne</option>
              </select>
            </label>
            <button type="submit">Valider</button>
          </form>
        </div>
      )}
    </>
  );
}

export default FollowUpStep;
