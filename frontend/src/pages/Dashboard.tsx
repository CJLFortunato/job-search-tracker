import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useDocumentTitle from 'common/useDocumentTitle';
import AddApplication from 'features/applications/components/AddApplication';
import KanbanCarousel from 'features/applications/components/KanbanCarousel';
import KanbanLarge from 'features/applications/components/KanbanLarge';
import StepDragDispatch from 'features/applications/components/stepComponents/StepDragDispatch';
import useApps from 'features/applications/useApps';
import ManageTags from 'features/tags/components/ManageTags';
import useTags from 'features/tags/useTags';
import useUser from 'features/user/useUser';

import PAGE_TITLE from './CONSTANTS';

function Dashboard() {
  const { user, error: userError } = useUser();
  const { error: appError } = useApps();
  const { error: tagError } = useTags();
  const [destinationId, setDestinationId] = useState<string>('');
  const [appId, setappId] = useState<string>('');
  const [openDispatch, setOpenDispatch] = useState(false);

  useDocumentTitle(`${PAGE_TITLE}Vos candidatures`);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate('/');
  }, [user]);

  useEffect(() => {
    if (userError) toast.error(userError, { theme: 'colored' });
    if (appError) toast.error(appError, { theme: 'colored' });
    if (tagError) toast.error(tagError, { theme: 'colored' });
  }, [userError, appError, tagError]);

  const onDragEnd = (result: any) => {
    console.log(result);
    setDestinationId(result.destination.droppableId);
    setappId(result.draggableId);
    setOpenDispatch(true);
  };

  useEffect(() => {
    console.log(destinationId);
  }, [destinationId]);

  return (
    <div className="page dashboard">
      { openDispatch && (
        <StepDragDispatch destinationId={destinationId} appId={appId} setOpen={setOpenDispatch} />
      )}
      <div className="btn-ctn">
        <AddApplication />
        <ManageTags />
      </div>
      <h1>Vos candidatures</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <KanbanLarge />
      </DragDropContext>
      <KanbanCarousel />
    </div>
  );
}

export default Dashboard;
