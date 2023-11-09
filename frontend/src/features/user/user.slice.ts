/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import { State, User, NewUser } from './types';

const user = JSON.parse(sessionStorage.getItem('user') || '""');

const initialState: State = {
  user: user || undefined,
  isLoading: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<NewUser>) => {
      state.isLoading = true;
      state.error = '';
    },
    registerSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    login: (state, action: PayloadAction<NewUser>) => {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.isLoading = true;
      state.error = '';
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false;
      state.user = action.payload;
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.isLoading = true;
      state.error = '';
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.user = undefined;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.error = '';
      state.user = undefined;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
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
    updateUser,
    updateUserSuccess,
    updateUserFailure,
    deleteUser,
    deleteUserSuccess,
    deleteUserFailure,
  },
} = userSlice;
export default userSlice.reducer;
