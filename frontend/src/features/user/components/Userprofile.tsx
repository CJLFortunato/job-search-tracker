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
      ...user,
      email: newEmail,
    });
  };

  const handleSubmitpassword = (e: any) => {
    e.preventDefault();
    if (!user) return;
    if (formData.password2 && (formData.password !== formData.password2)) {
      console.log('mismatched passwords');
      return;
    }
    updateUsers({
      ...user,
      password: formData.password,
    });
  };

  return (
    <div className="user-form">
      <form onSubmit={handleSubmitEmail}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Tapez votre adresse Email"
            value={newEmail}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Enregister les modifications</button>
      </form>
      <form onSubmit={handleSubmitpassword}>
        <label htmlFor="password">
          Mot de passe
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Tapez votre mot de passe"
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
            placeholder="Confirmez votre mot de passe"
            value={formData.password2}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Enregistrer les modifications</button>
      </form>
      <DeleteButton id={user?.id || ''} />
    </div>
  );
}

export default UserProfile;
