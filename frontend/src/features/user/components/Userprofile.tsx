import React, { useState } from 'react';

import Divider from 'components/Divider';

import DeleteButton from './DeleteButton';
import { emailChangeForm, passwordChangeForm } from '../user.schemas';
import useUser from '../useUser';

function UserProfile() {
  const [newEmail, setNewEmail] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });
  const [error, setError] = useState<any>('');
  const [error2, setError2] = useState<any>('');

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    if (name === 'email') {
      setError('');
      setNewEmail(value);
    }
    if (name !== 'email') {
      setError2('');
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const { user, updateUsers } = useUser();

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();
    const { error: err } = emailChangeForm.validate(newEmail);
    if (err) {
      setError(err);
      return;
    }
    updateUsers({
      _id: user?._id || '',
      email: newEmail,
    });
    setNewEmail('');
  };

  const handleSubmitpassword = (e: any) => {
    e.preventDefault();
    const { error: err } = passwordChangeForm.validate(formData);
    if (err) {
      setError2(err);
      return;
    }
    if (!user) return;
    if (formData.password2 && (formData.password !== formData.password2)) {
      const errObj = {
        details: [
          {
            message: 'Vous avez tapé 2 mots de passe différents',
            path: ['password2'],
          },
        ],
      };
      setError2(errObj);
      return;
    }
    updateUsers({
      _id: user._id,
      email: user.email,
      password: formData.password,
    });
    setFormData({
      password: '',
      password2: '',
    });
  };

  return (
    <div className="profile-form">
      <Divider text="Changer l'adresse email" />
      <form onSubmit={handleSubmitEmail}>
        <label htmlFor="email">
          Nouvelle adresse email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Tapez votre nouvelle adresse email"
            value={newEmail}
            onChange={handleChange}
            className={
              error
                ? 'error-input'
                : ''
            }
          />
        </label>
        {
          error && (
            <div className="error-ctn">
              {error.details?.map((e: any) => e.message)}
            </div>
          )
        }
        <button type="submit">Enregister les modifications</button>
      </form>
      <Divider text="Changer le mot de passe" />
      <form onSubmit={handleSubmitpassword}>
        <label htmlFor="password">
          Nouveau mot de passe
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Tapez votre nouveau mot de passe"
            value={formData.password}
            onChange={handleChange}
            className={
              error2.details?.find((err: any) => err.path?.find((el: any) => el === 'password'))
                ? 'error-input'
                : ''
            }
          />
        </label>
        <label htmlFor="password">
          Confirmer votre mot de passe
          <input
            type="password"
            name="password2"
            id="password2"
            placeholder="Confirmez votre nouveau mot de passe"
            value={formData.password2}
            onChange={handleChange}
            className={
              error2.details?.find((err: any) => err.path?.find((el: any) => el === 'password2'))
                ? 'error-input'
                : ''
            }
          />
        </label>
        {
          error2 && (
            <div className="error-ctn">
              {error2.details?.map((e: any) => e.message)}
            </div>
          )
        }
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <Divider text="Suppression de compte" />
      <DeleteButton id={user?._id || ''} />
    </div>
  );
}

export default UserProfile;
