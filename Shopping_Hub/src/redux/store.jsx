import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import { productsApi } from "../service/product";

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
  devTools: true,
});
