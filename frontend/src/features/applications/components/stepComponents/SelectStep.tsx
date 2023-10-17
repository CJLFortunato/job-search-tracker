import React from 'react';

import { StepsProps } from 'features/applications/types';
import AnswerStep from './AnswerStep';
import ApplyStep from './ApplyStep';
import FollowUpStep from './FollowUpStep';
import InterviewStep from './InterviewStep';

function SelectStep(props: StepsProps) {
  const { application } = props;
  return (
    <select>
      <option value="0" selected={application.status === 0}>A postuler</option>
      <ApplyStep application={application} />
      <FollowUpStep application={application} />
      <InterviewStep application={application} />
      <AnswerStep application={application} />
    </select>
  );
}

export default SelectStep;
