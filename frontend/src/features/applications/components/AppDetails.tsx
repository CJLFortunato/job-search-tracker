import React from 'react';

import Divider from 'components/Divider';
import TagChip from 'features/tags/components/TagChip';

import DeleteButton from './DeleteButton';
import EditApp from './EditApp';
import SelectStep from './stepComponents/SelectStep';
import { CONTRACT_TYPE } from '../CONSTANTS';
import { AppDetailsProps } from '../types';

function AppDetails(props: AppDetailsProps) {
  const { app, setOpen } = props;

  return (
    <dialog className="app-details">
      <article>
        <div className="actions-ctn">
          <SelectStep application={app} setOpenDialog={setOpen} />
          <EditApp app={app} />
          <DeleteButton id={app._id || ''} />
          <button type="button" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <h3>
          <a href={app.jobLink}>{app.jobTitle}</a>
          {' - '}
          <a href={app.companyLink}>{app.companyName}</a>
        </h3>
        <ul>
          <li>
            {
              app.tags.map((tag) => <TagChip key={tag._id} tag={tag} canDelete={false} />)
            }
          </li>
          <li>
            <strong>Type de contrat: </strong>
            {CONTRACT_TYPE[app.contractType as keyof typeof CONTRACT_TYPE]}
          </li>
          <li>
            <strong>Localisation: </strong>
            {app.location}
          </li>
          <li>
            <strong>Contact: </strong>
            {app.contactName || 'Pas de contact'}
          </li>
          <li>
            <strong>Type d&apos;application: </strong>
            {app.appType}
          </li>
          <li>
            <strong>Lettre de motivation obligatoire: </strong>
            {app.coverLetter ? 'Oui' : 'Non'}
          </li>
          <li>
            <strong>Annonce sauvegardée le: </strong>
            {new Date(app.createdAt || '').toLocaleDateString()}
          </li>
        </ul>
        <Divider text="Envoi de la candidature" />
        {
          app.steps?.apply && (
            <ul>
              <li>
                <strong>Candidature envoyée le: </strong>
                {new Date(app.steps?.apply?.date || '').toLocaleDateString()}
              </li>
              <li>
                <strong>Candidature envoyée par: </strong>
                {app.steps?.apply?.type}
              </li>
            </ul>
          )
        }
        <Divider text="Relances" />
        {
          app.steps?.followUp?.map((fl) => (
            <ul>
              <li>
                <strong>Relance envoyée le: </strong>
                {new Date(fl.date || '').toLocaleDateString()}
              </li>
              <li>
                <strong>Relance envoyée par: </strong>
                {fl.type}
              </li>
            </ul>
          ))
        }
        <Divider text="Entretiens" />
        {
          app.steps?.interview?.map((int) => (
            <ul>
              <li>
                <strong>Entretien réalisé le: </strong>
                {new Date(int.date || '').toLocaleDateString()}
              </li>
              <li>
                <strong>Entretien réalisé par: </strong>
                {int.type}
              </li>
            </ul>
          ))
        }
        <Divider text="Réponse de l&apos;entreprise" />
        {
          app.steps?.answer && (
            <ul>
              <li>
                <strong>Réponse reçue le: </strong>
                {new Date(app.steps?.answer?.date || '').toLocaleDateString()}
              </li>
              <li>
                <strong>Réponse: </strong>
                {app.steps?.answer?.outcome}
              </li>
            </ul>
          )
        }
      </article>
    </dialog>
  );
}

export default AppDetails;
