import React, { useState } from 'react';

import { loginForm, registerForm } from '../schemas';
import { UserFormProps } from '../types';
import useUser from '../useUser';

function UserForm(props: UserFormProps) {
  const { isLogin } = props;

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState<any>('');

  const handleChange = (e: any) => {
    const { target: { name, value } } = e;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { loginUser, registerUser } = useUser();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password2 && (formData.password !== formData.password2)) {
      console.log('mismatched passwords');
      return;
    }
    if (isLogin) {
      const { error: err } = loginForm.validate(formData);
      console.log(loginForm.validate(formData));
      if (err) {
        setError(err);
        return;
      }
      loginUser({ email: formData.email, password: formData.password });
      return;
    }

    const { error: err } = registerForm.validate(formData);
    if (err) {
      setError(err);
      return;
    }
    registerUser({ email: formData.email, password: formData.password });
  };

  console.log(error);
  console.log(typeof error);

  return (
    <div className="user-form">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Tapez votre adresse Email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
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
        {
          !isLogin && (
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
          )
        }
        <button type="submit">Valider</button>
      </form>
      <div className="error-ctn">
        {error.details?.map((e: any) => e.message)}
      </div>
    </div>
  );
}

export default UserForm;
