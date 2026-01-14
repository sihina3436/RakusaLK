import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";

import  authAPI  from "./auth/authApi";
import StatsApi from "./stats/statsApi";
import  {sizeApi } from "./size/sizeAPI";
import  {colorApi}  from "./color/colorApi";
import  {productApi}  from "./products/productApi";
import  {categoryApi } from "./category/categoryAPI";
import  {orderApi } from "./order/orderApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    [authAPI.reducerPath]: authAPI.reducer,
    [StatsApi.reducerPath]: StatsApi.reducer,
    [sizeApi.reducerPath]: sizeApi.reducer,
    [colorApi.reducerPath]: colorApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authAPI.middleware,
      StatsApi.middleware,
      sizeApi.middleware,
      colorApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      orderApi.middleware
    ),
});
