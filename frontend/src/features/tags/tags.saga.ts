import { PayloadAction } from '@reduxjs/toolkit';
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
import { Tag, NewTag } from './types';

function* workGetTags(): any {
  try {
    const response: Tag[] = yield call(TagsAPI.getTags);
    yield put(getTagsSuccess(response));
  } catch (err: any) {
    yield put(getTagsFailure(err.message));
  }
}

function* workCreateTag(action: PayloadAction<NewTag[]>): any {
  try {
    const response: Tag[] = yield call(TagsAPI.createTags, action.payload);
    yield put(createTagsSuccess(response));
  } catch (err: any) {
    yield put(createTagsFailure(err.message));
  }
}

function* workDeleteTags(action: PayloadAction<string>): any {
  try {
    const response: Tag = yield call(TagsAPI.deleteTag, action.payload);
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
