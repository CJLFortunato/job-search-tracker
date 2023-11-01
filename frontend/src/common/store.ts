import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import appsReducer from '../features/applications/apps.slice';
import tagsReducer from 'features/tags/tags.slice';
import userReducer from '../features/user/user.slice';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

export const store = configureStore({
  reducer: {
    userReducer,
    appsReducer,
    tagsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
ReturnType,
RootState,
unknown,
Action<string>
>;
