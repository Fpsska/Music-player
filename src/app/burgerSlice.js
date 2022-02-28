import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
    name: "burgerSlice",
    initialState: {
        isBurgerOpen: false,
        isLightTheme: false,
        isCurtainVisible: true
    },
    reducers: {
        switchBurgerStatus(state, action) {
            state.isBurgerOpen = action.payload
        },
        swithTheme(state, action) {
            state.isLightTheme = action.payload
        },
        switchCurtainStatus(state, action) {
            state.isCurtainVisible = action.payload
        }
    }
})

export const { switchBurgerStatus, swithTheme, switchCurtainStatus } = burgerSlice.actions;

export default burgerSlice.reducer;