/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
} from '@reduxjs/toolkit';

import { Application, State } from './types';

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
    },
    getAppsSuccess: (state, action) => {
      state.isLoading = false;
      state.apps = action.payload;
    },
    getAppsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    createApps: (state, action) => {
      state.isLoading = true;
    },
    createAppsSuccess: (state, action) => {
      state.isLoading = false;
      state.apps.push(action.payload);
    },
    createAppsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateApps: (state, action) => {
      state.isLoading = true;
    },
    updateAppsSuccess: (state, action) => {
      state.isLoading = false;
      const remainingApps = state.apps.filter((app) => app._id !== action.payload._id);
      state.apps = [...remainingApps, action.payload];
    },
    updateAppsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteApps: (state, action) => {
      state.isLoading = true;
    },
    deleteAppsSuccess: (state, action) => {
      state.isLoading = false;
      state.apps = state.apps.filter((app) => app._id !== action.payload._id);
    },
    deleteAppsFailure: (state, action) => {
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
