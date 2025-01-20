import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/user.slice';
import searchReducer from '../features/user/search.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    search: searchReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<(typeof store)['getState']>;
export type AppDispatch = AppStore['dispatch'];
