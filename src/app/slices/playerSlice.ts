import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { albumListTypes, mockDataTypes } from '../../Types/mainSliceTypes';

// /. imports

export const fetchAlbumsData = createAsyncThunk(
    'mainSlice/fetchAlbumData',
    async (_, { rejectWithValue }) => {
        try {
            const URL =
                'https://music-player-backend-ps8zm5180-fpsska.vercel.app/api/data';
            const response = await fetch(URL);

            if (!response.ok) {
                console.error('Error: response error');
            }

            const data = await response.json();
            return data;
        } catch (err: any) {
            console.error(err || err.message);
            return rejectWithValue(err.message); // send to case rejected.type of extreReducers
        }
    }
);

interface mainSliceState {
    albumList: albumListTypes[];
    likedData: albumListTypes[];
    filteredData: albumListTypes[];
    mockData: mockDataTypes[];

    isPaused: boolean;
    isAudioMuted: boolean;
    status: string;
    error: string;
    currentTrackPreview: string;
    currentArtistName: string;
    currentTrackName: string;
    currentTrack: string;

    musicIndex: number;

    currentLineProgress: any;
    currentTimeProgress: any;
    songDuration: any;
    duration: any;
    offsetCurrentTime: any;

    currentCardID: number;
}

// /. interfaces

const initialState: mainSliceState = {
    albumList: [],
    likedData: [],
    filteredData: [],
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
        },
        {
            id: 8
        }
    ],

    isPaused: true,
    isAudioMuted: false,

    status: '',
    error: '',
    currentTrackPreview: '',
    currentArtistName: 'untitled',
    currentTrackName: 'untitled',
    currentTrack: '',

    musicIndex: 1,
    currentLineProgress: 0,
    currentTimeProgress: 0,
    songDuration: 0,
    duration: 0,
    offsetCurrentTime: 0,

    currentCardID: 0
};

// /. initialState

const playerSlice = createSlice({
    name: 'playerSlice',
    initialState,
    reducers: {
        switchPauseStatus(state, action: PayloadAction<boolean>) {
            state.isPaused = action.payload;
        },
        setTrackPreview(state, action: PayloadAction<string>) {
            // image
            state.currentTrackPreview = action.payload;
        },
        setArtistName(state, action: PayloadAction<string>) {
            state.currentArtistName = action.payload;
        },
        setTrackName(state, action: PayloadAction<string>) {
            state.currentTrackName = action.payload;
        },
        setTrack(state, action: PayloadAction<string>) {
            // mp3
            state.currentTrack = action.payload;
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
        addToLikedAlbum(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            // /. payload
            const targetTrack = state.albumList.find(item => item.id === id);

            if (targetTrack) {
                targetTrack.isFavourite = true;
                state.likedData.push(targetTrack);
                state.filteredData = state.likedData;
            }
        },
        removeFromLikedAlbum(state, action: PayloadAction<{ id: number }>) {
            state.filteredData = state.likedData.filter(
                item => item.id !== action.payload.id
            );
        },
        filterLikedData(state, action: PayloadAction<string>) {
            state.filteredData = state.likedData.filter(item =>
                RegExp(action.payload, 'gi').test(item.title)
            );
        },
        setCurrentCardID(state, action: PayloadAction<number>) {
            state.currentCardID = action.payload;
            // console.log(state.currentCardID);
        }
    },
    extraReducers: {
        [fetchAlbumsData.pending.type]: state => {
            state.status = 'loading';
        },
        [fetchAlbumsData.fulfilled.type]: (
            state,
            action: PayloadAction<albumListTypes[]>
        ) => {
            state.albumList = action.payload;
            state.albumList.map(item => {
                item.isFavourite = false;
            });
            state.status = 'success';
        },
        [fetchAlbumsData.rejected.type]: (
            state,
            action: PayloadAction<string>
        ) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    }
});

export const {
    switchPauseStatus,
    setTrackPreview,
    setArtistName,
    setTrackName,
    setTrack,
    setCurrentLineProgress,
    setCurrentTimeProgress,
    setSongDuration,
    setDuration,
    setOffsetTime,
    switchMutedStatus,
    setCurrentmusicIndex,
    addToLikedAlbum,
    removeFromLikedAlbum,
    filterLikedData,

    setCurrentCardID
} = playerSlice.actions;

export default playerSlice.reducer;
