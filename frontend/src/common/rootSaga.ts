import { fork } from 'redux-saga/effects';

import {
  getAppsSaga,
  createAppSaga,
  updateAppsSaga,
  deleteAppsSaga,
} from 'features/applications/apps.saga';
import { getTagsSaga, createTagSaga, deleteTagsSaga } from 'features/tags/tags.saga';
import {
  loginSaga,
  registerSaga,
  updateUserSaga,
  deleteUserSaga,
  logoutSaga,
} from 'features/user/user.saga';

export default function* rootSaga() {
  yield fork(loginSaga);
  yield fork(logoutSaga);
  yield fork(registerSaga);
  yield fork(updateUserSaga);
  yield fork(deleteUserSaga);

  yield fork(getAppsSaga);
  yield fork(createAppSaga);
  yield fork(updateAppsSaga);
  yield fork(deleteAppsSaga);

  yield fork(createTagSaga);
  yield fork(getTagsSaga);
  yield fork(deleteTagsSaga);
}
