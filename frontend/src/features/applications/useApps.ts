import { useEffect } from 'react';

import {
  getApps,
  createApps,
  updateApps,
  deleteApps,
} from './apps.slice';
import { ApplicationCreate, ApplicationUpdate } from './types';
import { useAppDispatch, useAppSelector } from '../../common/hooks';

function useApps() {
  const dispatch = useAppDispatch();
  const { apps, error } = useAppSelector((state) => state.appsReducer);

  useEffect(() => {
    if (!apps.length) dispatch(getApps());
  }, []);

  const createApp = (newApp: ApplicationCreate) => {
    dispatch(createApps(newApp));
  };
  const updateApp = (updatedApp: ApplicationUpdate) => {
    dispatch(updateApps(updatedApp));
  };
  const deleteApp = (id: string) => {
    dispatch(deleteApps(id));
  };
  return {
    apps,
    createApp,
    updateApp,
    deleteApp,
    error,
  };
}

export default useApps;
