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
    localStorage.setItem('user', JSON.stringify(response));
    yield put(registerSuccess(response));
  } catch {
    yield put(registerFailure(action.payload));
  }
}

function* workLogin(action: any): any {
  try {
    const response: any = yield call(UserAPI.login, action.payload);
    localStorage.setItem('user', JSON.stringify(response));
    yield put(loginSuccess(response));
  } catch {
    yield put(loginFailure(action.payload));
  }
}

function* workGetUser(action: any): any {
  try {
    const response: any = yield call(UserAPI.getUser, action.payload);
    yield put(getUserSuccess(response));
  } catch {
    yield put(getUserFailure(action.payload));
  }
}

function* workUpdateUser(action: any): any {
  try {
    const response: any = yield call(UserAPI.updateUser, action.payload);
    yield put(updateUserSuccess(response));
  } catch {
    yield put(updateUserFailure(action.payload));
  }
}

function* workDeleteUser(action: any): any {
  try {
    yield call(UserAPI.deleteUser, action.payload);
    yield put(deleteUserSuccess());
  } catch {
    yield put(deleteUserFailure(action.payload));
  }
}

function* workLogout(action: any): any {
  try {
    const response: any = yield call(UserAPI.logout);
    localStorage.removeItem('user');
    yield put(logoutSuccess(response));
  } catch {
    yield put(logoutFailure(action.payload));
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
