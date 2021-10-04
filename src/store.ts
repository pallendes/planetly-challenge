import {configureStore} from '@reduxjs/toolkit';
import {estimationApi} from './services/estimation-api';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    [estimationApi.reducerPath]: estimationApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
      return getDefaultMiddleware().concat([logger, estimationApi.middleware]);
    }

    return getDefaultMiddleware().concat(estimationApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
