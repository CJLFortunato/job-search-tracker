import { PayloadAction } from '@reduxjs/toolkit';
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
import { Application, ApplicationCreate, ApplicationUpdate } from './types';

function* workGetApps(): any {
  try {
    const response: Application[] = yield call(AppsAPI.getApps);
    yield put(getAppsSuccess(response));
  } catch (err: any) {
    console.log(err);
    yield put(getAppsFailure(err.message));
  }
}

function* workCreateApp(action: PayloadAction<ApplicationCreate>): any {
  try {
    const response: Application = yield call(AppsAPI.createApp, action.payload);
    yield put(createAppsSuccess(response));
  } catch (err: any) {
    yield put(createAppsFailure(err.message));
  }
}

function* workUpdateApps(action: PayloadAction<ApplicationUpdate>): any {
  try {
    const response: Application = yield call(AppsAPI.updateApp, action.payload);
    yield put(updateAppsSuccess(response));
  } catch (err: any) {
    yield put(updateAppsFailure(err.message));
  }
}

function* workDeleteApps(action: PayloadAction<string>): any {
  try {
    const response: Application = yield call(AppsAPI.deleteApp, action.payload);
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
  yield takeEvery(updateApps.type, workUpdateApps);
}

export function* deleteAppsSaga() {
  yield takeEvery(deleteApps, workDeleteApps);
}
