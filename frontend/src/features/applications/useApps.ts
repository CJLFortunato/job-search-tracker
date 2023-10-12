import { useEffect } from 'react';

import {
  getApps,
  createApps,
  updateApps,
  deleteApps,
} from './apps.slice';
import { Application } from './types';
import { useAppDispatch, useAppSelector } from '../../common/hooks';

function useApps() {
  const dispatch = useAppDispatch();
  const apps = useAppSelector((state) => state.appsReducer.apps);

  useEffect(() => {
    if (!apps.length) dispatch(getApps());
  }, []);

  const createApp = (newApp: Application) => {
    dispatch(createApps(newApp));
  };
  const updateApp = (updatedApp: Application) => {
    dispatch(updateApps(updatedApp));
  };
  const deleteApp = (appToDelete: Application) => {
    dispatch(deleteApps(appToDelete));
  };
  return {
    apps,
    createApp,
    updateApp,
    deleteApp,
  };
}

export default useApps;
