import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { swapArrayElementsPositions } from 'utils/helpers/swapArrayElementsPositions';

import { IalbumList, ImockData } from 'types/mainSliceTypes';

import { fetchAlbumsData } from 'app/api/fetchAlbumsData';

// /. imports

interface mainSliceState {
    albumList: IalbumList[];
    currentPlayerData: IalbumList[];
    likedData: IalbumList[];
    filteredData: IalbumList[];
    mockData: ImockData[];

    isPaused: boolean;
    isAudioMuted: boolean;
    status: string;
    error: string | null;
    currentTrackPreview: string;
    currentArtistName: string;
    currentTrackName: string;

    musicIndex: number;
    musicCategory: string;

    currentLineProgress: any;
    currentTimeProgress: any;
    songDuration: any;
    duration: any;
    offsetCurrentTime: any;

    currentCardID: null | number;
    isSameSong: boolean;
}

// /. interfaces

const initialState: mainSliceState = {
    albumList: [],
    currentPlayerData: [],
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

    currentTrackPreview: '', // image
    currentArtistName: 'untitled',
    currentTrackName: 'untitled',

    musicIndex: 0,
    musicCategory: 'recomended',

    currentLineProgress: 0,
    currentTimeProgress: 0,
    songDuration: 0,
    duration: 0,
    offsetCurrentTime: 0,

    currentCardID: null,
    isSameSong: false
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
            state.currentTrackPreview = action.payload;
        },
        setArtistName(state, action: PayloadAction<string>) {
            state.currentArtistName = action.payload;
        },
        setTrackName(state, action: PayloadAction<string>) {
            state.currentTrackName = action.payload;
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
            // console.log(action.payload);
            state.musicIndex = action.payload;
        },
        setCurrentMusicCategory(state, action: PayloadAction<string>) {
            state.musicCategory = action.payload;
        },
        setCurrentPlayerData(
            state,
            action: PayloadAction<{ data: IalbumList[]; id?: number }>
        ) {
            const { data, id } = action.payload;
            // /. payload

            if (id) {
                const isFirstEl =
                    state.currentPlayerData.findIndex(
                        song => song.id === id
                    ) === 0;

                if (!isFirstEl) {
                    console.log(action.payload, 'shuffled assign');

                    state.currentPlayerData = swapArrayElementsPositions(
                        data,
                        id
                    );
                }

                return;
            } else {
                console.log(action.payload, 'default assign');
                state.currentPlayerData = data;
            }
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

        setCurrentCardID(state, action: PayloadAction<{ id: number }>) {
            const { id } = action.payload;
            // /. payload

            if (state.currentCardID !== id) {
                console.log(id);
                state.currentCardID = id;
                state.isSameSong = false;
            } else {
                state.isSameSong = true;
            }
        }
    },
    extraReducers: {
        [fetchAlbumsData.pending.type]: state => {
            state.status = 'loading';
        },
        [fetchAlbumsData.fulfilled.type]: (
            state,
            action: PayloadAction<IalbumList[]>
        ) => {
            state.albumList = action.payload;
            state.albumList.map(item => {
                item.isFavourite = false;
            });
            state.status = 'success';
            state.error = null;
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
    setCurrentLineProgress,
    setCurrentTimeProgress,
    setSongDuration,
    setDuration,
    setOffsetTime,
    switchMutedStatus,
    setCurrentmusicIndex,
    setCurrentPlayerData,
    addToLikedAlbum,
    removeFromLikedAlbum,
    filterLikedData,

    setCurrentCardID
} = playerSlice.actions;

export default playerSlice.reducer;
