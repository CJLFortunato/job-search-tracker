import React from 'react';
import { Link } from 'react-router-dom';

import img from 'assets/campaign-creators-e6n7uoEnYbA-unsplash.jpg';

import useDocumentTitle from 'common/useDocumentTitle';

import PAGE_TITLE from './CONSTANTS';

function Home() {
  useDocumentTitle(`${PAGE_TITLE}L'outil de suivi de candidature`);

  return (
    <div className="page home">
      <img src={img} alt="" />
      <div className="statement">
        <h1>Objectif Emploi</h1>
        <p>
          Bienvenue sur Back To Work, l&apos;outil de suivi de
          candidature à destination des demandeurs d&apos;emploi.
          Sauvegardez toutes vos candidatures et retrouvez en un clic les détails des offres.
          Avec Back To Work la recherche d&apos;emploi n&apos;a jamais été aussi facile!
          <div className="links-ctn">
            <Link to="/login">
              Se connecter
            </Link>
            <Link to="/signup">
              S&apos;inscrire
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
}

export default Home;
