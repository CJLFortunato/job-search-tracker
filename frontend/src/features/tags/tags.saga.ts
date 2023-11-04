import { call, put, takeEvery } from 'redux-saga/effects';

import TagsAPI from './tags.api';
import {
  getTags,
  getTagsSuccess,
  getTagsFailure,
  createTags,
  createTagsSuccess,
  createTagsFailure,
  deleteTags,
  deleteTagsSuccess,
  deleteTagsFailure,

} from './tags.slice';

function* workGetTags(): any {
  try {
    const response: any = yield call(TagsAPI.getTags);
    yield put(getTagsSuccess(response));
  } catch (err: any) {
    yield put(getTagsFailure(err.message));
  }
}

function* workCreateTag(action: any): any {
  try {
    const response: any = yield call(TagsAPI.createTags, action.payload);
    yield put(createTagsSuccess(response));
  } catch (err: any) {
    yield put(createTagsFailure(err.message));
  }
}

function* workDeleteTags(action: any): any {
  try {
    const response: any = yield call(TagsAPI.deleteTag, action.payload);
    yield put(deleteTagsSuccess(response));
  } catch (err: any) {
    yield put(deleteTagsFailure(err.message));
  }
}

export function* createTagSaga() {
  yield takeEvery(createTags, workCreateTag);
}

export function* getTagsSaga() {
  yield takeEvery(getTags, workGetTags);
}

export function* deleteTagsSaga() {
  yield takeEvery(deleteTags, workDeleteTags);
}
