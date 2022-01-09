import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name: "mainSlice",
    initialState: {
        recomendedList: [
            {
                id: 1,
                image: "albom_preview-1.png",
                artist: "ERIKA RECINOS",
                song: "Monsters Go Bump"
            },
            {
                id: 2,
                image: "albom_preview-7.png",
                artist: "ODESZA",
                song: "Moment Apart"
            },
            {
                id: 3,
                image: "albom_preview-3.png",
                artist: "RYAN GRIGDRY",
                song: "Shortwave"
            },
            {
                id: 4,
                image: "albom_preview-4.png",
                artist: "ROGER TERRY",
                song: "Dream On"
            },
            {
                id: 5,
                image: "albom_preview-5.png",
                artist: "IMAGINE DRAGON",
                song: "Origins"
            },
            {
                id: 6,
                image: "albom_preview-6.png",
                artist: "HYONNA",
                song: "Chaff & Dust"
            }
        ],
        playList: [
            {
                id: 7,
                image: "albom_preview-2.png",
                artist: "IMAGINE DRAGON",
                song: "Believer"
            },
            {
                id: 8,
                image: "albom_preview-3.png",
                artist: "RYAN GRIGDRY",
                song: "Shortwave"
            },
            {
                id: 9,
                image: "albom_preview-6.png",
                artist: "HYONNA",
                song: "Chaff & Dust"
            },
            {
                id: 10,
                image: "albom_preview-4.png",
                artist: "ROGER TERRY",
                song: "Dream On"
            },
            {
                id: 11,
                image: "albom_preview-7.png",
                artist: "ODESZA",
                song: "Moment Apart"
            },
            {
                id: 12,
                image: "albom_preview-5.png",
                artist: "IMAGINE DRAGON",
                song: "Origins"
            },
        ],
        isPlaylistPage: false,
        isPlayerPage: false,
    },
    reducers: {
        switchPlaylistPageStatus(state, action) {
            state.isPlaylistPage = action.payload
        },
        switchPlayerPageStatus(state, action) {
            state.isPlayerPage = action.payload
        }
    }
})

export const { switchPlaylistPageStatus, switchPlayerPageStatus } = mainSlice.actions;

export default mainSlice.reducer;