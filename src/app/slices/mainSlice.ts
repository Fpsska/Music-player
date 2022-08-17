import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// /. imports


interface mainSliceState {
  isSearchPage: boolean;
  isPlaylistPage: boolean;
  isPlayerPage: boolean;
  isLoading: boolean;
}

// /. interfaces

const initialState: mainSliceState = {
  isSearchPage: false,
  isPlaylistPage: false,
  isPlayerPage: false,
  isLoading: true
};

// /. initialState

const mainSlice = createSlice({
  name: 'mainSlice',
  initialState,
  reducers: {
    switchSearchPageStatus(state, action: PayloadAction<boolean>) {
      state.isSearchPage = action.payload;
    },
    switchPlaylistPageStatus(state, action: PayloadAction<boolean>) {
      state.isPlaylistPage = action.payload;
    },
    switchPlayerPageStatus(state, action: PayloadAction<boolean>) {
      state.isPlayerPage = action.payload;
    },
    switchLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const {
  switchSearchPageStatus,
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
  switchLoadingStatus
} = mainSlice.actions;

export default mainSlice.reducer;
