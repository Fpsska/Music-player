import { configureStore } from '@reduxjs/toolkit';
import mainSlice from "./mainSlice"
import burgerSlice from './burgerSlice';

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice,
    burgerSlice: burgerSlice,
  },
});
