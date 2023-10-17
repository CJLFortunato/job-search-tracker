import React, { useState} from 'react';

import { useAppDispatch } from 'common/hooks';
import { updateApps } from 'features/applications/apps.slice';
import { StepsProps } from 'features/applications/types';
import useApps from 'features/applications/useApps';


function FollowUpStep(props: StepsProps) {
  const { application }  =props;
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
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    dispatch(updateApps({
      ...application,
      steps: {
        ...application.steps,
        followUp: formData
      }
    }));
  };

  return (
    <>
      <option value="apply">J&apos;ai postulé</option>
      <div className="modal">
        <h2>Informations de relance</h2>
        <form>
          <label htmlFor="date">
            Date à laquelle vous avez relancé
            <input type="date" name="date" id="date" />
          </label>
          <label htmlFor="type">
            Par quelle voie vous avez relancé
            <select name="type" id="type">
              <option value="">Comment avez vous relancé ?</option>
              <option value="form">Formulaire de contact</option>
              <option value="email">Email</option>
              <option value="phone">Téléphone</option>
              <option value="social">Réseaux sociaux</option>
              <option value="in person">En personne</option>
            </select>
          </label>
        </form>
      </div>
    </>
  );
}

export default FollowUpStep;
