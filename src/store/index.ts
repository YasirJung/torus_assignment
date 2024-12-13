import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice.ts';
import analyticsReducer from './slices/analyticsSlice.ts';

export const store = configureStore({
  reducer: {
    users: userReducer,
    analytics: analyticsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
