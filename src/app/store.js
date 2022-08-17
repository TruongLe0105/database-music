import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/apis/ProductSlice';
import categoriesReducer from '../features/apis/CategoriesSlice';

export const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoriesReducer,
  },
});
