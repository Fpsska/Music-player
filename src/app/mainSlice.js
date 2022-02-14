import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAlbumsData = createAsyncThunk(
    "mainSlice/fetchAlbumData", async () => {
        const response = await fetch("https://backend-music-player.herokuapp.com/")
        const data = await response.json();
        const result = data.data;
        return result
    }
)


const mainSlice = createSlice({
    name: "mainSlice",
    initialState: {
        albumList: [],
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
        isPlaylistPage: false,
        isPlayerPage: false,
        isPaused: true,
        status: null,
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
    },
    reducers: {
        switchPlaylistPageStatus(state, action) {
            state.isPlaylistPage = action.payload
        },
        switchPlayerPageStatus(state, action) {
            state.isPlayerPage = action.payload
        },
        switchPauseStatus(state, action) {
            state.isPaused = action.payload
        },
        setTrackPreview(state, action) {
            state.currentTrackPreview = action.payload
        },
        setArtistName(state, action) {
            state.currentArtistName = action.payload
        },
        setTrackName(state, action) {
            state.currentTrackName = action.payload
        },
        switchLoadingStatus(state, action) {
            state.isLoading = action.payload
        },
        setCurrentLineProgress(state, action) {
            state.currentLineProgress = action.payload
        },
        setCurrentTimeProgress(state, action) {
            state.currentTimeProgress = action.payload
        },
        setOffsetTime(state, action) {
            state.offsetCurrentTime = action.payload
        },
        setSongDuration(state, action) {
            state.songDuration = action.payload
        },
        setDuration(state, action) {
            state.duration = action.payload
        },
        switchMutedStatus(state, action) {
            state.isAudioMuted = action.payload
        }
    },
    extraReducers: {
        [fetchAlbumsData.pending]: (state) => {
            state.status = "loading"
        },
        [fetchAlbumsData.fulfilled]: (state, action) => {
            state.albumList = action.payload
            state.status = "success"
        },
        [fetchAlbumsData.rejected]: (state) => {
            state.status = "failed"
        }
    }
})

export const { switchPlaylistPageStatus, switchPlayerPageStatus, switchPauseStatus, setTrackPreview, setArtistName, setTrackName, switchLoadingStatus, setCurrentLineProgress, setCurrentTimeProgress, setSongDuration, setDuration, setOffsetTime, switchMutedStatus } = mainSlice.actions;

export default mainSlice.reducer;