import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../store/authSlice';
import uploadReducer from '../store/uploadSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    upload: uploadReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
