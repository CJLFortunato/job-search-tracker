import React from 'react';

import Divider from 'components/Divider';
import Modal from 'components/Modal';
import TagChip from 'features/tags/components/TagChip';

import AddForm from './AddForm';
import DeleteButton from './DeleteButton';
import SelectStep from './stepComponents/SelectStep';
import { CONTRACT_TYPE, CONTACT_TYPE, ANSWERS } from '../CONSTANTS';
import { AppDetailsProps } from '../types';

function AppDetails(props: AppDetailsProps) {
  const { app, setOpen } = props;
  console.log(app.jobLink);
  console.log(app.companyLink);
  return (
    <div className="app-details">
      <dialog className="app-dialog">
        <div className="actions-ctn">
          <SelectStep application={app} setOpenDialog={setOpen} />
          <Modal
            buttonLabel={(
              <>
                <i className="fa-solid fa-pen" />
                <span>Modifier</span>
              </>
            )}
          >
            <AddForm isUpdate app={app} />
          </Modal>
          <DeleteButton id={app._id || ''} />
          <button type="button" onClick={() => setOpen(false)} className="close-btn">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <h3>
          {
            app.jobLink
              ? (
                <a href={app.jobLink} target="_blank" rel="noreferrer">{app.jobTitle}</a>
              )
              : (
                app.jobTitle
              )
          }
          {' - '}
          {
            app.companyLink
              ? (
                <a href={app.companyLink} target="_blank" rel="noreferrer">{app.companyName}</a>
              )
              : (
                app.companyName
              )
          }
        </h3>
        <ul>
          <li className="tag-ctn">
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
                {CONTACT_TYPE[app.steps?.apply?.type as keyof typeof CONTACT_TYPE]}
              </li>
            </ul>
          )
        }
        <Divider text="Relances" />
        {
          app.steps?.followUp?.map((fl) => (
            <ul key={`${fl.date}-${fl.type}-${Math.random() * 100}`}>
              <li>
                <strong>Relance envoyée le: </strong>
                {new Date(fl.date || '').toLocaleDateString()}
              </li>
              <li>
                <strong>Relance envoyée par: </strong>
                {CONTACT_TYPE[fl.type as keyof typeof CONTACT_TYPE]}
              </li>
            </ul>
          ))
        }
        <Divider text="Entretiens" />
        {
          app.steps?.interview?.map((int) => (
            <ul key={`${int.date}-${int.type}-${Math.random() * 100}`}>
              <li>
                <strong>Entretien réalisé le: </strong>
                {new Date(int.date || '').toLocaleDateString()}
              </li>
              <li>
                <strong>Entretien réalisé par: </strong>
                {CONTACT_TYPE[int.type as keyof typeof CONTACT_TYPE]}
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
                {ANSWERS[app.steps?.answer?.outcome as keyof typeof ANSWERS]}
              </li>
            </ul>
          )
        }
      </dialog>
    </div>
  );
}

export default AppDetails;
