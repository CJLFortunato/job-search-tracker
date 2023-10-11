import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div>
        <Link to="/" className="app-title">Titre</Link>
      </div>
      <div className="header-ctn">
        <Link to="/login">Se connecter</Link>
        <Link to="/signup">S&apos;inscrire</Link>
      </div>
    </header>
  );
}

export default Header;
