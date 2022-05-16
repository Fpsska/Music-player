import { configureStore } from '@reduxjs/toolkit';

import mainSlice from './slices/mainSlice';
import burgerSlice from './slices/burgerSlice';

// /. imports

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice,
    burgerSlice: burgerSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
