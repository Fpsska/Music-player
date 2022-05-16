import { createSlice, createAsyncThunk, PayloadAction, current } from '@reduxjs/toolkit';

import { albumListTypes, mockDataTypes } from '../../Types/mainSliceTypes';

// /. imports

export const fetchAlbumsData = createAsyncThunk(
  'mainSlice/fetchAlbumData',
  async () => {
    const response = await fetch('https://backend-music-player.herokuapp.com/');
    const data = await response.json();
    const result = data.data;
    return result;
  }
);

interface mainSliceState {
  albumList: albumListTypes[];
  likedData: albumListTypes[];
  mockData: mockDataTypes[];
  isSearchPage: boolean;
  isPlaylistPage: boolean;
  isPlayerPage: boolean;
  isPaused: boolean;
  isAudioMuted: boolean;
  status: string;
  isLoading: boolean;
  currentTrackPreview: string;
  currentArtistName: string;
  currentTrackName: string;
  currentTrack: string;
  musicIndex: number;
  currentSlideID: string;
  currentLineProgress: number;
  currentTimeProgress: number;
  songDuration: number;
  duration: number;
  offsetCurrentTime: number;
}

// /. interfaces

const initialState: mainSliceState = {
  albumList: [],
  likedData: [],
  mockData: [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 6
    },
    {
      id: 7
    }
  ],
  isSearchPage: false,
  isPlaylistPage: false,
  isPlayerPage: false,
  isPaused: true,
  isAudioMuted: false,
  isLoading: true,
  status: '',
  currentTrackPreview: '',
  currentArtistName: 'untitled',
  currentTrackName: 'untitled',
  currentTrack: '',
  currentSlideID: '',
  musicIndex: 1,
  currentLineProgress: 0,
  currentTimeProgress: 0,
  songDuration: 0,
  duration: 0,
  offsetCurrentTime: 0
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
    switchPauseStatus(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    setTrackPreview(state, action: PayloadAction<string>) { // img
      state.currentTrackPreview = action.payload;
    },
    setArtistName(state, action: PayloadAction<string>) {
      state.currentArtistName = action.payload;
    },
    setTrackName(state, action: PayloadAction<string>) {
      state.currentTrackName = action.payload;
    },
    setTrack(state, action: PayloadAction<string>) {  // mp3
      state.currentTrack = action.payload;
      // console.log(action.payload)
    },
    switchLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCurrentLineProgress(state, action: PayloadAction<number>) {
      state.currentLineProgress = action.payload;
    },
    setOffsetTime(state, action: PayloadAction<number>) {
      state.offsetCurrentTime = action.payload;
    },
    setCurrentTimeProgress(state, action: PayloadAction<any>) {
      state.currentTimeProgress = action.payload;
    },
    setSongDuration(state, action: PayloadAction<any>) {
      state.songDuration = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    switchMutedStatus(state, action: PayloadAction<boolean>) {
      state.isAudioMuted = action.payload;
    },
    setCurrentmusicIndex(state, action: PayloadAction<number>) {
      state.musicIndex = action.payload;
    },
    setCurrentSlideID(state, action: PayloadAction<any>) {
      const { id } = action.payload;
      // console.log("id /", typeof id, id)
      state.currentSlideID = id;
    },
    setFavouriteSong(state) {
      state.albumList.forEach(item => {
        if (String(item.id) === state.currentSlideID) {
          item.isFavourite = true;
          console.log('currentSlideID /', state.currentSlideID, ':', item.id);
        }
      });
      state.likedData = state.albumList.filter(item => item.isFavourite === true);
    }
  },
  extraReducers: {
    [fetchAlbumsData.pending.type]: (state) => {
      state.status = 'loading';
    },
    [fetchAlbumsData.fulfilled.type]: (
      state,
      action: PayloadAction<albumListTypes[]>
    ) => {
      state.albumList = action.payload;
      state.albumList.map(item => item.isFavourite = false);
      state.status = 'success';
    },
    [fetchAlbumsData.rejected.type]: (state) => {
      state.status = 'failed';
    }
  }
});

export const {
  switchSearchPageStatus,
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
  switchPauseStatus,
  setTrackPreview,
  setArtistName,
  setTrackName,
  setTrack,
  switchLoadingStatus,
  setCurrentLineProgress,
  setCurrentTimeProgress,
  setSongDuration,
  setDuration,
  setOffsetTime,
  switchMutedStatus,
  setCurrentmusicIndex,
  setCurrentSlideID,
  setFavouriteSong
} = mainSlice.actions;

export default mainSlice.reducer;
