import React, { useState } from 'react';

import COLUMNS from 'features/applications/CONSTANTS';
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
      </button>
      {open && (
        <div className="select-menu">
          <button type="button" className="select-option">A postuler</button>
          <ApplyStep application={application} />
          <FollowUpStep application={application} />
          <InterviewStep application={application} />
          <AnswerStep application={application} />
        </div>
      )}
    </div>
  );
}

export default SelectStep;
