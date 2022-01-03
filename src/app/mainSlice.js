import { createSlice } from "@reduxjs/toolkit";

const mainSlice = createSlice({
    name: "authorization",
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
        ]
    },
    reducers: {
    }
})

export const { } = mainSlice.actions;

export default mainSlice.reducer;