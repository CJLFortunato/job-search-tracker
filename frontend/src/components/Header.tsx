import React from 'react';
import { Link } from 'react-router-dom';

import useUser from '../features/user/useUser';

function Header() {
  const { user, logoutUser } = useUser();
  return (
    <header>
      <div>
        <Link to="/" className="app-title">Titre</Link>
      </div>
      <nav className="header-ctn">
        {
          user
            ? (
              <>
                <Link to="/dashboard">Vos candidatures</Link>
                <Link to="/profile">Profil utilisateur</Link>
                <button type="button" onClick={logoutUser} className="logout-btn">
                  Se déconnecter
                </button>
              </>
            )
            : (
              <>
                <Link to="/login">Se connecter</Link>
                <Link to="/signup">S&apos;inscrire</Link>
              </>
            )
        }
      </nav>
    </header>
  );
}

export default Header;
