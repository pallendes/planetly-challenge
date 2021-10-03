import {configureStore} from '@reduxjs/toolkit';
import {estimationApi} from './services/estimation-api';
import logger from 'redux-logger';
import {name as estimationsSliceName, reducer} from './containers/slice';

export const store = configureStore({
  reducer: {
    [estimationApi.reducerPath]: estimationApi.reducer,
    [estimationsSliceName]: reducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({serializableCheck: false});
    middleware.concat(estimationApi.middleware);

    if (process.env.NODE_ENV === 'development') {
      return middleware.concat(logger);
    }

    return middleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
