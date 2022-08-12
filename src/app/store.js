import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/apis/ProductSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
