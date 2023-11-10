import React from 'react';
import { Link } from 'react-router-dom';

function Error() {
  return (
    <div className="page error">
      <h1>404: Page non trouvée</h1>
      <p>La page que vous cherchez n&apos;existe pas</p>
      <Link to="/">Retourner sur la page d'accueil</Link>
    </div>
  );
}

export default Error;
