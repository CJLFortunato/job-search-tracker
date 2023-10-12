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

function* workGetApps(): any {
  try {
    const response: any = yield call(AppsAPI.getApps);
    yield put(getAppsSuccess(response));
  } catch (err: any) {
    console.log(err);
    yield put(getAppsFailure(err.message));
  }
}

function* workCreateApp(action: any): any {
  try {
    const response: any = yield call(AppsAPI.createApp, action.payload);
    yield put(createAppsSuccess(response));
  } catch (err: any) {
    yield put(createAppsFailure(err.message));
  }
}

function* workUpdateApps(action: any): any {
  try {
    const response: any = yield call(AppsAPI.updateApp, action.payload);
    yield put(updateAppsSuccess(response));
  } catch (err: any) {
    yield put(updateAppsFailure(err.message));
  }
}

function* workDeleteApps(action: any): any {
  try {
    const response: any = yield call(AppsAPI.deleteApp, action.payload);
    yield put(deleteAppsSuccess(response));
  } catch (err: any) {
    yield put(deleteAppsFailure(err.message));
  }
}

export function* createAppSaga() {
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
