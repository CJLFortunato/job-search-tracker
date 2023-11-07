import React from 'react';
import { Link } from 'react-router-dom';

import useUser from '../features/user/useUser';

function Header() {
  const { user, logoutUser } = useUser();
  return (
    <header>
      <div>
        <Link to="/" className="app-title">
          <i className="fa-solid fa-rocket" />
          Back To Work
        </Link>
      </div>
      <nav className="header-ctn">
        {
          user
            ? (
              <>
                <Link to="/dashboard">
                  <i className="fa-solid fa-table-columns" />
                  Vos candidatures
                </Link>
                <Link to="/profile">
                  <i className="fa-regular fa-circle-user" />
                  Profil utilisateur
                </Link>
                <button type="button" onClick={logoutUser} className="logout-btn">
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                  Se déconnecter
                </button>
              </>
            )
            : (
              <>
                <Link to="/login">
                  <i className="fa-solid fa-person-walking-arrow-right" />
                  Se connecter
                </Link>
                <Link to="/signup">
                  <i className="fa-solid fa-user-plus" />
                  S&apos;inscrire
                </Link>
              </>
            )
        }
      </nav>
    </header>
  );
}

export default Header;
