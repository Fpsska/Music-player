import { configureStore } from '@reduxjs/toolkit';
import mainSlice from "./mainSlice"

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice
  },
});
