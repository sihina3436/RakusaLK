import { configureStore } from '@reduxjs/toolkit';
import authAPI  from './auth/authApi';
import authReducer from './auth/authSlice';

export const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer, 
    [authAPI.reducerPath]: authAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authAPI.middleware),
});
