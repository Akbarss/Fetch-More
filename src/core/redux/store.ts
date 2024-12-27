import { configureStore } from "@reduxjs/toolkit";
import crudSlice from "../redux/features/crud/crudSlice";
import productsSlice from "../redux/features/products/productsSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    crud: crudSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
