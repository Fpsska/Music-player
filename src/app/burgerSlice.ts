import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionsTypes } from "../models/burgerSliceTypes";

interface burgerSliceState {
  questions: questionsTypes[];
  isBurgerOpen: boolean;
  isLightTheme: boolean;
  isCurtainVisible: boolean;
  isInformationVisible: boolean;
  isContactInfo: boolean;
  isFaqsInfo: boolean;
}

const initialState: burgerSliceState = {
  isBurgerOpen: false,
  isLightTheme: false,
  isCurtainVisible: true,
  isInformationVisible: false,
  isContactInfo: false,
  isFaqsInfo: false,
  questions: [
    {
      id: "0",
      question: "Which technologies used in this app?",
      answer:
        "This project was bootstrapped with Create React App, using the Redux and Redux Toolkit template.",
      isDropDownHidden: true,
    },
    {
      id: "1",
      question: "Where did you get all the information about the tracks from?",
      answer: "We used free Deezer API for get data of all provided tracks.",
      isDropDownHidden: true,
    },
  ],
};

const burgerSlice = createSlice({
  name: "burgerSlice",
  initialState,
  reducers: {
    switchBurgerStatus(state, action: PayloadAction<boolean>) {
      state.isBurgerOpen = action.payload;
    },
    swithTheme(state, action: PayloadAction<boolean>) {
      state.isLightTheme = action.payload;
    },
    switchCurtainStatus(state, action: PayloadAction<boolean>) {
      state.isCurtainVisible = action.payload;
    },
    switchInformationStatus(state, action: PayloadAction<boolean>) {
      state.isInformationVisible = action.payload;
    },
    switchContactInfoStatus(state, action: PayloadAction<boolean>) {
      state.isContactInfo = action.payload;
    },
    switchFaqsInfoStatus(state, action: PayloadAction<boolean>) {
      state.isFaqsInfo = action.payload;
    },
    switchDropDownStatus(state, action: PayloadAction<any>) {
      const { id, status } = action.payload;
      if (id) {
        state.questions.forEach((item) => (item.isDropDownHidden = true));
      }
      state.questions[id].isDropDownHidden = status;
    },
  },
});

export const {
  switchBurgerStatus,
  swithTheme,
  switchCurtainStatus,
  switchInformationStatus,
  switchContactInfoStatus,
  switchFaqsInfoStatus,
  switchDropDownStatus,
} = burgerSlice.actions;

export default burgerSlice.reducer;