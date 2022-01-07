import { createSlice } from "@reduxjs/toolkit";

const burgerSlice = createSlice({
    name: "burgerSlice",
    initialState: {
        isBurgerOpen: false
    },
    reducers: {
        switchBurgerStatus(state, action) {
            state.isBurgerOpen = action.payload
        }
    }
})

export const { switchBurgerStatus } = burgerSlice.actions;

export default burgerSlice.reducer;