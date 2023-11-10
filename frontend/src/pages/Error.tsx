import React from 'react';
import { Link } from 'react-router-dom';

import useDocumentTitle from 'common/useDocumentTitle';

import PAGE_TITLE from './CONSTANTS';

function Error() {
  useDocumentTitle(`${PAGE_TITLE}Page introuvable`);
  return (
    <div className="page error">
      <h1>404: Page non trouvée</h1>
      <p>La page que vous cherchez n&apos;existe pas</p>
      <Link to="/">Retourner sur la page d&apos;accueil</Link>
    </div>
  );
}

export default Error;
