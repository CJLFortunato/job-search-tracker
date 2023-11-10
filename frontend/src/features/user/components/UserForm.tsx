import React, { useState } from 'react';

import { UserFormProps } from '../types';
import { loginForm, registerForm } from '../user.schemas';
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
    setError('');
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { loginUser, registerUser } = useUser();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.password2 && (formData.password !== formData.password2)) {
      const errObj = {
        details: [
          {
            message: 'Vous avez tapé 2 mots de passe différents',
            path: ['password2'],
          },
        ],
      };
      setError(errObj);
      return;
    }
    if (isLogin) {
      const newData = {
        email: formData.email,
        password: formData.password,
      };
      const { error: err } = loginForm.validate(newData);

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
            className={
              error.details?.find((err: any) => err.path?.find((el: any) => el === 'email'))
                ? 'error-input'
                : ''
            }
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
            className={
              error.details?.find((err: any) => err.path.find((el: any) => el === 'password'))
                ? 'error-input'
                : ''
            }
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
                className={
                  error.details?.find((err: any) => err.path.find((el: any) => el === 'password2'))
                    ? 'error-input'
                    : ''
                }
              />
            </label>
          )
        }
        {
          error && (
            <div className="error-ctn">
              {error.details?.map((e: any) => e.message)}
            </div>
          )
        }
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default UserForm;
