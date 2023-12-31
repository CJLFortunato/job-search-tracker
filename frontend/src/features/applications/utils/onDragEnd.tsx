/* eslint-disable consistent-return */
import React from 'react';

import { useAppSelector } from 'common/hooks';

import AnswerStep from '../components/stepComponents/AnswerStep';
import ApplyStep from '../components/stepComponents/ApplyStep';
import FollowUpStep from '../components/stepComponents/FollowUpStep';
import InterviewStep from '../components/stepComponents/InterviewStep';

function useDrag() {
  const apps = useAppSelector((state) => state.appsReducer.apps);
  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination || source.droppableId === destination.droppableId) return;
    const targetApp = apps.filter((app) => app._id === result.draggableId)[0];
    switch (destination.droppableId) {
      case ('0'):
        break;
      case ('1'):
        return (
          <ApplyStep application={targetApp} />
        );
        break;
      case ('2'):
        return (
          <FollowUpStep application={targetApp} />
        );
        break;
      case ('3'):
        return (
          <InterviewStep application={targetApp} />
        );
        break;
      case ('4'):
        return (
          <AnswerStep application={targetApp} />
        );
        break;
      default:
        break;
    }
  };

  return { onDragEnd };
}
export default useDrag;
