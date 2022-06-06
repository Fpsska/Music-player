import { configureStore } from '@reduxjs/toolkit';

import mainSlice from './slices/mainSlice';
import burgerSlice from './slices/burgerSlice';
import playerSlice from './slices/playerSlice';

// /. imports

export const store = configureStore({
  reducer: {
    mainSlice: mainSlice,
    burgerSlice: burgerSlice,
    playerSlice: playerSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
