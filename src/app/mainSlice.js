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
        isPlaylistPage: false,
        isPlayerPage: false,
        isPaused: true,
        status: null
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

export const { switchPlaylistPageStatus, switchPlayerPageStatus, switchPauseStatus } = mainSlice.actions;

export default mainSlice.reducer;