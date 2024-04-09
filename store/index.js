import { configureStore } from '@reduxjs/toolkit';
import categoriesReducer from './categorySlice';

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
  },
});