import { useEffect } from 'react';

import {
  getApps,
  createApps,
  updateApps,
  deleteApps,
} from './apps.slice';
import { Application, ApplicationCreate } from './types';
import { useAppDispatch, useAppSelector } from '../../common/hooks';

function useApps() {
  const dispatch = useAppDispatch();
  const apps = useAppSelector((state) => state.appsReducer.apps);

  useEffect(() => {
    if (!apps.length) dispatch(getApps());
  }, []);

  const createApp = (newApp: ApplicationCreate) => {
    dispatch(createApps(newApp));
  };
  const updateApp = (updatedApp: Application) => {
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
  };
}

export default useApps;
