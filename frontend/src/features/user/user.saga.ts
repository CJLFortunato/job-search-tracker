import { call, put, takeEvery } from 'redux-saga/effects';

import UserAPI from './user.api';
import {
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
  logout,
  logoutSuccess,
  logoutFailure,
} from './user.slice';

function* workRegister(action: any): any {
  try {
    const response: any = yield call(UserAPI.register, action.payload);
    sessionStorage.setItem('user', JSON.stringify(response));
    yield put(registerSuccess(response));
  } catch (err: any) {
    yield put(registerFailure(err.message));
  }
}

function* workLogin(action: any): any {
  try {
    const response: any = yield call(UserAPI.login, action.payload);
    sessionStorage.setItem('user', JSON.stringify(response));
    yield put(loginSuccess(response));
  } catch (err: any) {
    yield put(loginFailure(err.message));
  }
}

function* workGetUser(action: any): any {
  try {
    const response: any = yield call(UserAPI.getUser, action.payload);
    yield put(getUserSuccess(response));
  } catch (err: any) {
    yield put(getUserFailure(err.message));
  }
}

function* workUpdateUser(action: any): any {
  try {
    const response: any = yield call(UserAPI.updateUser, action.payload);
    yield put(updateUserSuccess(response));
  } catch (err: any) {
    yield put(updateUserFailure(err.message));
  }
}

function* workDeleteUser(action: any): any {
  try {
    yield call(UserAPI.deleteUser, action.payload);
    yield put(deleteUserSuccess());
  } catch (err: any) {
    yield put(deleteUserFailure(err.message));
  }
}

function* workLogout(): any {
  try {
    const response: any = yield call(UserAPI.logout);
    sessionStorage.removeItem('user');
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

export function* getUserSaga() {
  yield takeEvery(getUser, workGetUser);
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
