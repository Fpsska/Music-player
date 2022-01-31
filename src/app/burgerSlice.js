import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
    name: "burgerSlice",
    initialState: {
        isBurgerOpen: false,
        isLightTheme: false
    },
    reducers: {
        switchBurgerStatus(state, action) {
            state.isBurgerOpen = action.payload
        },
        swithTheme(state, action) {
            state.isLightTheme = action.payload
        }
    }
})

export const { switchBurgerStatus, swithTheme } = burgerSlice.actions;

export default burgerSlice.reducer;