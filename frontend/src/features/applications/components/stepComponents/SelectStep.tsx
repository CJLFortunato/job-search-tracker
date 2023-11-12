import React, { useState } from 'react';

import Modal from 'components/Modal';
import { COLUMNS } from 'features/applications/CONSTANTS';
import { StepsProps } from 'features/applications/types';

import AnswerStep from './AnswerStep';
import ApplyStep from './ApplyStep';
import FollowUpStep from './FollowUpStep';
import InterviewStep from './InterviewStep';

function SelectStep(props: StepsProps) {
  const { application } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="select-step-btn"
      >
        {
          COLUMNS.find((col) => col.id === application.status)?.label
        }
        <i className="fa-solid fa-chevron-down" />
      </button>
      {open && (
        <div className="select-menu">
          <button type="button" className="select-option">A postuler</button>
          <Modal buttonLabel="J'ai postulé" isOption>
            <ApplyStep application={application} setOpenDialog={setOpen} />
          </Modal>
          <Modal buttonLabel="J'ai relancé" isOption>
            <FollowUpStep application={application} setOpenDialog={setOpen} />
          </Modal>
          <Modal buttonLabel="J'ai eu un entretien" isOption>
            <InterviewStep application={application} setOpenDialog={setOpen} />
          </Modal>
          <Modal buttonLabel="J'ai eu une réponse" isOption>
            <AnswerStep application={application} setOpenDialog={setOpen} />
          </Modal>
        </div>
      )}
    </div>
  );
}

export default SelectStep;
