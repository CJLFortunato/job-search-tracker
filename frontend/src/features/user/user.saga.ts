import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeEvery } from 'redux-saga/effects';

import { reset } from 'features/applications/apps.slice';
import { reset as resetTags } from 'features/tags/tags.slice';

import { NewUser, User } from './types';
import UserAPI from './user.api';
import {
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
  logout,
  logoutSuccess,
  logoutFailure,
} from './user.slice';

function* workRegister(action: PayloadAction<NewUser>): any {
  try {
    const response: User = yield call(UserAPI.register, action.payload);
    sessionStorage.setItem('user', JSON.stringify(response));
    yield put(registerSuccess(response));
  } catch (err: any) {
    yield put(registerFailure(err.message));
  }
}

function* workLogin(action: PayloadAction<NewUser>): any {
  try {
    const response: User = yield call(UserAPI.login, action.payload);
    sessionStorage.setItem('user', JSON.stringify(response));
    yield put(loginSuccess(response));
  } catch (err: any) {
    yield put(loginFailure(err.message));
  }
}

function* workUpdateUser(action: PayloadAction<User>): any {
  try {
    const response: User = yield call(UserAPI.updateUser, action.payload);
    sessionStorage.setItem('user', JSON.stringify(response));
    yield put(updateUserSuccess(response));
  } catch (err: any) {
    yield put(updateUserFailure(err.message));
  }
}

function* workDeleteUser(action: PayloadAction<string>): any {
  try {
    yield call(UserAPI.deleteUser, action.payload);
    sessionStorage.removeItem('user');
    yield put(deleteUserSuccess());
  } catch (err: any) {
    yield put(deleteUserFailure(err.message));
  }
}

function* workLogout(): any {
  try {
    const response: any = yield call(UserAPI.logout);
    sessionStorage.removeItem('user');
    yield put(reset());
    yield put(resetTags());
    yield put(logoutSuccess(response));
  } catch (err: any) {
    yield put(logoutFailure(err.message));
  }
}

export function* registerSaga() {
  yield takeEvery(register, workRegister);
}

export function* loginSaga() {
  yield takeEvery(login, workLogin);
}

export function* updateUserSaga() {
  yield takeEvery(updateUser, workUpdateUser);
}

export function* deleteUserSaga() {
  yield takeEvery(deleteUser, workDeleteUser);
}

export function* logoutSaga() {
  yield takeEvery(logout, workLogout);
}
