import { fork } from 'redux-saga/effects';

import {
  getAppsSaga,
  createAppSaga,
  updateAppsSaga,
  deleteAppsSaga,
} from '../features/applications/apps.saga';
import {
  loginSaga,
  registerSaga,
  getUserSaga,
  updateUserSaga,
  deleteUserSaga,
} from '../features/user/user.saga';

export default function* rootSaga() {
  yield fork(loginSaga);
  yield fork(registerSaga);
  yield fork(getUserSaga);
  yield fork(updateUserSaga);
  yield fork(deleteUserSaga);

  yield fork(getAppsSaga);
  yield fork(createAppSaga);
  yield fork(updateAppsSaga);
  yield fork(deleteAppsSaga);
}
