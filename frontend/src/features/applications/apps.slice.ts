/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {
  Application,
  State,
  ApplicationCreate,
  ApplicationUpdate,
} from './types';

const initialState: State = {
  apps: [],
  isLoading: false,
  error: '',
};

export const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.error = '';
      state.apps = [];
    },
    getApps: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    getAppsSuccess: (state, action: PayloadAction<Application[]>) => {
      state.isLoading = false;
      state.apps = action.payload;
    },
    getAppsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createApps: (state, action: PayloadAction<ApplicationCreate>) => {
      state.isLoading = true;
      state.error = '';
    },
    createAppsSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      state.apps.push(action.payload);
    },
    createAppsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateApps: (state, action: PayloadAction<ApplicationUpdate>) => {
      state.isLoading = true;
      state.error = '';
    },
    updateAppsSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      const remainingApps = state.apps.filter((app) => app._id !== action.payload._id);
      state.apps = [...remainingApps, action.payload];
    },
    updateAppsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteApps: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = '';
    },
    deleteAppsSuccess: (state, action: PayloadAction<Application>) => {
      state.isLoading = false;
      state.apps = state.apps.filter((app) => app._id !== action.payload._id);
    },
    deleteAppsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  actions: {
    reset,
    getApps,
    getAppsSuccess,
    getAppsFailure,
    createApps,
    createAppsSuccess,
    createAppsFailure,
    updateApps,
    updateAppsSuccess,
    updateAppsFailure,
    deleteApps,
    deleteAppsSuccess,
    deleteAppsFailure,
  },
} = appsSlice;
export default appsSlice.reducer;
