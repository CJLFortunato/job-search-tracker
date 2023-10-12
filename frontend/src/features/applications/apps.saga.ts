import { call, put, takeEvery } from 'redux-saga/effects';

import AppsAPI from './apps.api';
import {
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
} from './apps.slice';

function* workGetApps(action: any): any {
  try {
    const response: any = yield call(AppsAPI.getApps);
    yield put(getAppsSuccess(response));
  } catch {
    yield put(getAppsFailure(action.payload));
  }
}

function* workCreateApp(action: any): any {
  try {
    const response: any = yield call(AppsAPI.createApp, action.payload);
    yield put(createAppsSuccess(response));
  } catch {
    yield put(createAppsFailure(action.payload));
  }
}

function* workUpdateApps(action: any): any {
  try {
    const response: any = yield call(AppsAPI.updateApp, action.payload);
    yield put(updateAppsSuccess(response));
  } catch {
    yield put(updateAppsFailure(action.payload));
  }
}

function* workDeleteApps(action: any): any {
  try {
    const response: any = yield call(AppsAPI.deleteApp, action.payload);
    yield put(deleteAppsSuccess(response));
  } catch {
    yield put(deleteAppsFailure(action.payload));
  }
}

export function* registerSaga() {
  yield takeEvery(createApps, workCreateApp);
}

export function* getAppsSaga() {
  yield takeEvery(getApps, workGetApps);
}

export function* updateAppsSaga() {
  yield takeEvery(updateApps, workUpdateApps);
}

export function* deleteAppsSaga() {
  yield takeEvery(deleteApps, workDeleteApps);
}
