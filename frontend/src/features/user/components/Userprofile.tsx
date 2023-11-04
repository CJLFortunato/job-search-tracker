import React, { useState } from 'react';

import DeleteButton from './DeleteButton';
import useUser from '../useUser';

function UserProfile() {
  const [newEmail, setNewEmail] = useState('');
  const [formData, setFormData] = useState({
    password: '',
    password2: '',
  });

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    if (name === 'email') setNewEmail(value);
    if (name !== 'email') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const { user, updateUsers } = useUser();

  const handleSubmitEmail = (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (!newEmail) {
      return;
    }
    updateUsers({
      _id: user._id,
      email: newEmail,
    });
    setNewEmail('');
  };

  const handleSubmitpassword = (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (formData.password2 && (formData.password !== formData.password2)) {
      console.log('mismatched passwords');
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
      <div className="divider">
        Changer l&apos;adresse email
        <hr />
      </div>
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
          />
        </label>
        <button type="submit">Enregister les modifications</button>
      </form>
      <div className="divider">
        Changer le mot de passe
        <hr />
      </div>
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
          />
        </label>
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <div className="divider">
        Suppression de compte
        <hr />
      </div>
      <DeleteButton id={user?._id || ''} />
    </div>
  );
}

export default UserProfile;
