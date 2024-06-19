import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../slices/authSlice';
import loadingSlice from '../slices/loadingSlice';

export const store = configureStore({
  reducer: { auth: authSlice, loading: loadingSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;