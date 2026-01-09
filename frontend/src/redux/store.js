import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import authAPI from "./auth/authApi";
import StatsApi from "./stats/statsApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authAPI.reducerPath]: authAPI.reducer,
    [StatsApi.reducerPath]: StatsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      StatsApi.middleware
    ),
});
