/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
} from '@reduxjs/toolkit';

import { State } from './types';

const user = JSON.parse(localStorage.getItem('user') || '""');

const initialState: State = {
  user: user || undefined,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action) => {
      state.isLoading = true;
    },
    registerSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    login: (state, action) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    getUser: (state, action) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    getUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser: (state, action) => {
      state.isLoading = true;
    },
    updateUserSuccess: (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    updateUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUser: (state, action) => {
      state.isLoading = true;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.user = undefined;
    },
    deleteUserFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.error = '';
      state.user = undefined;
    },
    logoutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  actions: {
    logout,
    logoutSuccess,
    logoutFailure,
    register,
    registerSuccess,
    registerFailure,
    login,
    loginSuccess,
    loginFailure,
    getUser,
    getUserSuccess,
    getUserFailure,
    updateUser,
    updateUserSuccess,
    updateUserFailure,
    deleteUser,
    deleteUserSuccess,
    deleteUserFailure,
  },
} = userSlice;
export default userSlice.reducer;
