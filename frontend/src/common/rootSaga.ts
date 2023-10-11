import { fork } from 'redux-saga/effects';

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
}
