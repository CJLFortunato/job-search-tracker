import React, { useState } from 'react';

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
      <button type="button" onClick={() => setOpen(true)}>Etapes</button>
      {open && (
        <>
          <button type="button">A postuler</button>
          <ApplyStep application={application} />
          <FollowUpStep application={application} />
          <InterviewStep application={application} />
          <AnswerStep application={application} />
        </>
      )}
    </div>
  );
}

export default SelectStep;
