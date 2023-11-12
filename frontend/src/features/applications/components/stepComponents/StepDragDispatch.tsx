import React from 'react';

import { useAppSelector } from 'common/hooks';
import { selectAppById } from 'features/applications/apps.slice';
import AnswerStep from 'features/applications/components/stepComponents/AnswerStep';
import ApplyStep from 'features/applications/components/stepComponents/ApplyStep';
import FollowUpStep from 'features/applications/components/stepComponents/FollowUpStep';
import InterviewStep from 'features/applications/components/stepComponents/InterviewStep';
import { COLUMNS } from 'features/applications/CONSTANTS';
import { StepDragDispatchProps } from 'features/applications/types';

function StepDragDispatch(props: StepDragDispatchProps) {
  const { destinationId, appId, setOpen } = props;
  const currentApp = useAppSelector((state) => selectAppById(state, appId));
  return (
    <div className="step-drag-dispatch">
      {destinationId === COLUMNS[1].id.toString() && (
        <ApplyStep application={currentApp} openOverride setOpenDialog={setOpen} />
      )}
      {destinationId === COLUMNS[2].id.toString() && (
        <FollowUpStep application={currentApp} openOverride setOpenDialog={setOpen} />
      )}
      {destinationId === COLUMNS[3].id.toString() && (
        <InterviewStep application={currentApp} openOverride setOpenDialog={setOpen} />
      )}
      {destinationId === COLUMNS[4].id.toString() && (
        <AnswerStep application={currentApp} openOverride setOpenDialog={setOpen} />
      )}
    </div>
  );
}

export default StepDragDispatch;
