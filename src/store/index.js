import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import cartReducer from "./cartSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  // adding api middleware enables caching, invalidation, polling
  // and other useful features provided by rtk query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
