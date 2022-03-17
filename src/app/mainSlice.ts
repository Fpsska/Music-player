import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { albumListTypes, mockDataTypes } from "../models/mainSliceTypes";

export const fetchAlbumsData = createAsyncThunk(
  "mainSlice/fetchAlbumData",
  async () => {
    const response = await fetch("https://backend-music-player.herokuapp.com/");
    const data = await response.json();
    const result = data.data;
    return result;
  }
);

interface mainSliceState {
  albumList: albumListTypes[];
  mockData: mockDataTypes[];
  isPlaylistPage: boolean;
  isPlayerPage: boolean;
  isPaused: boolean;
  isAudioMuted: boolean;
  status: string;
  isLoading: boolean;
  currentTrackPreview: string;
  currentArtistName: string;
  currentTrackName: string;
  currentLineProgress: string;
  currentTimeProgress: string;
  songDuration: string;
  duration: string;
  offsetCurrentTime: string;
}

const initialState: mainSliceState = {
  albumList: [],
  mockData: [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
    {
      id: 4,
    },
    {
      id: 6,
    },
    {
      id: 7,
    },
  ],
  isPlaylistPage: false,
  isPlayerPage: false,
  isPaused: true,
  status: "",
  isLoading: true,
  currentTrackPreview: "",
  currentArtistName: "untitled",
  currentTrackName: "untitled",
  currentLineProgress: "",
  currentTimeProgress: "",
  songDuration: "",
  duration: "",
  offsetCurrentTime: "",
  isAudioMuted: false,
};

const mainSlice = createSlice({
  name: "mainSlice",
  initialState,
  reducers: {
    switchPlaylistPageStatus(state, action: PayloadAction<boolean>) {
      state.isPlaylistPage = action.payload;
    },
    switchPlayerPageStatus(state, action: PayloadAction<boolean>) {
      state.isPlayerPage = action.payload;
    },
    switchPauseStatus(state, action: PayloadAction<boolean>) {
      state.isPaused = action.payload;
    },
    setTrackPreview(state, action: PayloadAction<string>) {
      state.currentTrackPreview = action.payload;
    },
    setArtistName(state, action: PayloadAction<string>) {
      state.currentArtistName = action.payload;
    },
    setTrackName(state, action: PayloadAction<string>) {
      state.currentTrackName = action.payload;
    },
    switchLoadingStatus(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCurrentLineProgress(state, action: PayloadAction<string>) {
      state.currentLineProgress = action.payload;
    },
    setCurrentTimeProgress(state, action: PayloadAction<string>) {
      state.currentTimeProgress = action.payload;
    },
    setOffsetTime(state, action: PayloadAction<string>) {
      state.offsetCurrentTime = action.payload;
    },
    setSongDuration(state, action: PayloadAction<string>) {
      state.songDuration = action.payload;
    },
    setDuration(state, action: PayloadAction<string>) {
      state.duration = action.payload;
    },
    switchMutedStatus(state, action: PayloadAction<boolean>) {
      state.isAudioMuted = action.payload;
    },
  },
  extraReducers: {
    [fetchAlbumsData.pending.type]: (state) => {
      state.status = "loading";
    },
    [fetchAlbumsData.fulfilled.type]: (
      state,
      action: PayloadAction<albumListTypes[]>
    ) => {
      state.albumList = action.payload;
      state.status = "success";
    },
    [fetchAlbumsData.rejected.type]: (state) => {
      state.status = "failed";
    },
  },
});

export const {
  switchPlaylistPageStatus,
  switchPlayerPageStatus,
  switchPauseStatus,
  setTrackPreview,
  setArtistName,
  setTrackName,
  switchLoadingStatus,
  setCurrentLineProgress,
  setCurrentTimeProgress,
  setSongDuration,
  setDuration,
  setOffsetTime,
  switchMutedStatus,
} = mainSlice.actions;

export default mainSlice.reducer;
